# Simu Checkpoint — le making-of

Un outil pour t'entraîner sur les vrais exercices de la piscine Go de Zone01, avec un éditeur, un terminal simulé par IA, et deux modes (Practice / True Exam). Voici comment on en est arrivés là — pas juste "ce qui existe", mais pourquoi c'est comme ça.

## Round 1 — le prototype qui n'existe plus

Au tout début, j'avais pas tes vrais exercices. J'ai inventé un système avec 3 "niveaux" (thème piscine — genre "1,2m", "grand bain"...), avec des exos que j'avais reconstruits moi-même à partir du repo public 01-edu. Ça marchait, mais :
- t'as dit "vire le shell, ça sert à rien"
- t'as dit "arrête le thème piscine, fais un truc à toi, genre pour ton groupie tracker" — t'avais raison, ça faisait très générique

C'est là qu'est né le style actuel : palette corail/or/teal, police Fraunces, zéro décor gratuit.

## Round 2 — le bug du chrono qui bouffait le clavier

Premier vrai bug intéressant. Le chrono faisait ça :
```js
setInterval(() => {
  state.timeLeft--;
  render(); // <- recree TOUTE la page, y compris le textarea
}, 1000);
```
Résultat : chaque seconde, ton champ de code se faisait recréer de zéro, et le focus/clavier partait avec. T'écrivais une lettre, une seconde après le focus disparaissait. Fix : le chrono touche plus jamais au DOM entier, juste le chiffre affiché :
```js
function tickTimerDisplay(){
  document.querySelector('.timer').textContent = fmtTime(state.timeLeft);
}
```

## Round 3 — les vrais exercices arrivent

T'as trouvé z01exam.online, tu m'as filé le JSON complet des 59 exercices (avec `statement`, `template`, `runner`). J'ai écrit un script Python qui :
- détecte automatiquement si un exo est "fonction" ou "programme" (en cherchant `"Expected function"` dans le texte)
- extrait la signature et le programme de test depuis les blocs ` ```go ` du markdown
- génère un stub qui compile (avec une valeur de retour bidon)

Sur 59 exercices, un seul (`canjump`) a fait planter la détection automatique — je l'ai corrigé à la main. Le reste, 100% automatique.

## Round 4 — "vide, tout à écrire"

Je t'avais fait des stubs avec une signature pré-remplie. Tu m'as dit : non, en vrai exam c'est vide, tu écris tout, même le `package`. Changement d'une ligne dans le script, mais ça change complètement l'exigence :
```python
lines.append(f"        stub:{js_str('')},")  # au lieu de generer une signature
```

## Round 5 — piscine vs cursus, la vraie découverte

Là ça a été le plus long, et le plus intéressant. Tu m'as montré des captures de ton vrai intranet (`printprogramname`, avec "Allowed functions: z01.PrintRune, pas fmt"), puis des vrais bouts de code à toi (`IsNegative` qui fait juste `z01.PrintRune('T')`/`'F'`, pas de `fmt`, pas de `return`).

Première tentative : j'ai juste retiré `fmt` du `main.go` et laissé `_ = piscine.MaFonction(...)` pour que ça compile quand même. T'as dit "c'est quoi cette ligne avec le `_`" — t'avais raison, ça n'existe nulle part en vrai, c'était un bricolage pour éviter de deviner.

Deuxième tentative, la bonne : j'ai construit un vrai afficheur en PrintRune, et — ça c'est le truc dont je suis le plus fier dans cette conversation — je l'ai **vérifié en installant un vrai compilateur Go** dans mon bac à sable, pas juste en espérant que ça marche :
```
Total tested: 32, failed: 0
```
30 sur 31 étaient identiques caractère pour caractère à la version `fmt`. Le seul écart (`slice`) vient d'un `%#v` propre à cet exo.

Troisième itération : t'as trouvé que mes booléens affichaient `"true"`/`"false"` en toutes lettres, alors que ton vrai code fait juste `'T'`/`'F'`. Et j'avais collé 5 fonctions d'aide (`prBool`, `prStr`...) même quand une seule servait. Simplifié : bool et string inline, seule `printInt` garde une fonction séparée (obligé, la récursion l'exige en Go).

## Round 6 — CORS, deux fois

Deux personnes différentes (limite deux fois toi) m'ont dit "ça marche pas dehors de Claude.ai". Le fond du problème : le bouton Run appelle direct l'API Claude, et ça marche QUE dans Claude.ai (qui gère l'auth tout seul). Solution : `server.go`, un petit serveur qui sert de relais, avec ta propre clé — d'abord pensé pour Anthropic, changé pour **Gemini** (gratuit, pas de carte bancaire) après vérification des vrais tarifs 2026.

## Round 7 — l'IA qui ment sur un fichier vide

Tu m'as signalé : "j'ai rien écrit, j'ai fait Run, ça m'a dit que c'était bon". Le compilateur simulé, c'est une IA à qui je demande de faire semblant — et sur un cas trop évident, elle s'est trompée. Fix : une vraie vérification en JS, pas de l'IA, avant même d'appeler l'API :
```js
function localSyntaxCheck(code, fileName){
  if(code.trim() === '') return `./${fileName}:1:1: expected 'package', found 'EOF'`;
  ...
}
```
Un fichier vide échoue maintenant instantanément, sans même consulter l'IA.

## Round 8 — Run vs Submit

Tu voulais séparer "je regarde ce que ça donne" (Run, brut) de "je me lance" (Submit, avec badge SUCCEEDED/FAILED + message à indice caché). Les deux appellent la même vérification en coulisses (`compileAndCheck`), juste affichée différemment.

## Round 9 — les messages à indice caché

Le principe : catégoriser l'erreur, puis piocher un message dont la métaphore pointe discrètement vers la vraie cause, sans jamais le dire clairement :
```js
missing_return: ["Your function walked off stage before the final bow. 🎭", ...]
```
"sortie de scène avant le salut final" pour un `return` manquant — ça se lit comme une blague, mais si t'y repenses en corrigeant, ça aide.

## Round 10 — Supabase

Dernier gros morceau. Les 59 exercices vivaient en dur dans `data.js`. Toi tu voulais pouvoir les modifier sans toucher au code, genre si 01 change un énoncé. Migration vers Supabase :
- `setup.sql` crée la table, active la sécurité en lecture seule
- `import.sql` remplit les 59 lignes (testé sur un vrai Postgres avant de te le donner : `INSERT 0 59`, zéro erreur)
- `app.js` va chercher les exercices au chargement au lieu de les lire en dur :
```js
async function loadLevelsFromSupabase(){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/exercises?select=*`, {...});
  ...
}
```

## Ce qui reste flou (honnêteté oblige)

Les tout premiers échanges (le tout premier prototype, avant les vrais exercices), je m'en souviens en gros mais pas au mot près — c'est loin dans la conversation. Le reste, à partir de "t'as trouvé z01exam.online", je le tiens précisément.