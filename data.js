// data.js -- que du contenu, zero logique.
// STRINGS/SUCCESS_MSGS/FAIL_MSGS : tous les textes (en/fr).
// LEVELS : les 10 niveaux, chaque exo a name/title/style/html/fnFile/
// stub(toujours vide)/mainCode(lecture seule ou null).

const STRINGS = {
  // -- ecran select --
  select_eyebrow: {en:"Exam Sim · Go Piscine", fr:"Simu Exam · Piscine Go"},
  select_sub: {en:"59 real exercises, N1 to N10 — pulled straight from the real exam pool. Practice mode: pick a level, browse freely. True Exam mode: one random exercise per level, in order, no going back — just like the real thing.",
               fr:"59 vrais exercices, N1 à N10 — tirés direct du vrai pool d'exam. Mode Practice : tu choisis un niveau, tu navigues librement. Mode True Exam : un exo random par niveau, dans l'ordre, sans retour en arrière — comme le vrai."},
  mode_practice: {en:"🎯 Practice", fr:"🎯 Practice"},
  mode_trueexam: {en:"⏱ True Exam", fr:"⏱ True Exam"},
  cat_piscine: {en:"Piscine 01", fr:"Piscine 01"},
  cat_cursus: {en:"Cursus 01", fr:"Cursus 01"},
  cursus_note: {en:"Same 59 exercises as the piscine — you're past that stage, but the exam pool doesn't change, just how it's tracked administratively.",
                fr:"Mêmes 59 exercices que la piscine — t'es déjà dans le cursus, mais le pool d'exam change pas, juste le suivi administratif est différent."},

  // -- ecran rules (avant de demarrer un run) --
  rules_practice_1: {en:"Random draw of exercises from this level's pool — not always the same ones.",
                      fr:"Tirage random d'exercices dans le pool de ce niveau — pas toujours les mêmes."},
  rules_editor_fn: {en:"On the right: your file — completely blank, just like the real exam. You write everything yourself: package declaration, imports, signature, logic. If the exercise expects a function, main.go is shown too (read-only) so you know exactly how it'll be called.",
                     fr:"À droite : ton fichier — complètement vide, comme en vrai exam. Tu écris tout toi-même : déclaration du package, imports, signature, logique. Si l'exercice attend une fonction, main.go est affiché aussi (lecture seule) pour que tu saches exactement comment elle sera appelée."},
  rules_run: {en:'"Run" to test your code in the console below.', fr:'"Run" pour tester ton code dans la console en dessous.'},
  rules_honesty: {en:"The console shows real compiler-style output — same as a real terminal, it won't hold your hand or pinpoint the exact issue for you.",
                  fr:"La console affiche une sortie façon vrai compilateur — comme un vrai terminal, ça te tient pas la main et ça te dit pas précisément le souci."},
  rules_timer: {en:"Time limit, keeps running even if you switch exercises.", fr:"Temps limité, continue même si tu changes d'exercice."},
  rules_cta: {en:"Start", fr:"C'est parti"},
  rules_note: {en:"⚠️ The console is an AI-simulated Go compiler — not a real one running in your browser. Very reliable for exercises like these, but it's still a simulation.",
               fr:"⚠️ La console est un compilo Go simulé par IA — pas un vrai compilo dans le navigateur. Très fiable sur ce genre d'exos, mais ça reste une simulation."},
  change_level: {en:"← change level", fr:"← changer de niveau"},

  // -- ecran exam : editeur + console --
  compiling: {en:"Running...", fr:"Exécution..."},
  term_placeholder: {en:"$ go run .\n(nothing yet — click Run)", fr:"$ go run .\n(rien pour l'instant — clique sur Run)"},
  run_btn: {en:"▶ Run", fr:"▶ Run"},
  submit_btn: {en:"Submit", fr:"Submit"},
  status_succeeded: {en:"SUCCEEDED", fr:"SUCCEEDED"},
  status_failed: {en:"FAILED", fr:"FAILED"},
  clear_btn: {en:"clear", fr:"effacer"},
  prev_btn: {en:"← Previous", fr:"← Précédent"},
  next_btn: {en:"Next →", fr:"Suivant →"},
  finish_now: {en:"Finish now", fr:"Terminer maintenant"},
  no_main: {en:"This exercise is a full standalone program — you write everything in main.go, there's no separate function file.",
            fr:"Cet exercice est un programme autonome complet — tu écris tout dans main.go, y'a pas de fichier fonction séparé."},
  empty_output: {en:"(empty output)", fr:"(sortie vide)"},
  cors_error: {en:"🔌 Could not reach the compiler function. Check your connection, or make sure the Supabase Edge Function is deployed and GEMINI_API_KEY is set.",
               fr:"🔌 Impossible de contacter le compilo. Vérifie ta connexion, ou vérifie que l'Edge Function est bien déployée sur Supabase avec la variable GEMINI_API_KEY configurée."},

  // -- mode True Exam --
  te_restart: {en:"restart", fr:"restart"},
  te_next: {en:"next", fr:"next"},
  te_status: {en:"Exo", fr:"Exo"},
  te_title: {en:"True Exam", fr:"True Exam"},

  // -- ecran end --
  end_title: {en:"Session complete", fr:"Session terminée"},
  end_cta_practice: {en:"Draw new exercises, same level 🔁", fr:"Retirer d'autres exos, même niveau 🔁"},
  end_ghost: {en:"← pick another level", fr:"← choisir un autre niveau"},
};

// Terminal flavor messages. FAIL messages are grouped by the kind of
// compiler/runtime error detected, each with a subtle metaphor that
// (very quietly) nods at the actual category of mistake -- never
// spelled out, never exercise-specific, just a faint echo if you
// think about it.
const FAIL_MSGS = {
  missing_return: {
    en:["Your function walked off stage before the final bow. 🎭",
        "The story's missing its last page.",
        "Almost there — but nobody said the last word."],
    fr:["Ta fonction est sortie de scène avant le salut final. 🎭",
        "L'histoire n'a pas de dernière page.",
        "Presque bon — mais personne n'a dit le dernier mot."]
  },
  undefined: {
    en:["Something in there was never properly introduced. 👋",
        "You're calling a name nobody answered to."],
    fr:["Un truc là-dedans n'a jamais été présenté correctement. 👋",
        "Tu appelles un nom que personne n'a repris."]
  },
  unused: {
    en:["You invited someone and never gave them the mic. 🎤",
        "A guest who never got to speak."],
    fr:["T'as invité quelqu'un et jamais donné le micro. 🎤",
        "Un invité qui n'a jamais pu parler."]
  },
  syntax: {
    en:["A door was left wide open somewhere in there. 🚪",
        "One of your brackets is still waiting for its other half."],
    fr:["Une porte est restée grande ouverte quelque part. 🚪",
        "Une de tes accolades attend encore sa moitié."]
  },
  type_mismatch: {
    en:["You tried to fit a square peg where a round one lives. 🔷",
        "Two shapes that were never meant to stack."],
    fr:["T'as essayé de faire rentrer un carré dans un rond. 🔷",
        "Deux formes qui n'étaient pas faites pour s'empiler."]
  },
  generic: {
    en:["The compiler has some things to tell you. Many things.",
        "It blew up, but in a good way (figuratively speaking).",
        "RIP this run. There'll be others.",
        "Error detected. Somewhere, an engineer sighs."],
    fr:["Le compilo a des trucs à te dire. Beaucoup de trucs.",
        "Ça a explosé, mais dans le bon sens du terme.",
        "RIP ce run. Y en aura d'autres.",
        "Erreur détectée. Quelque part, un ingénieur soupire."]
  }
};

const SUCCESS_MSGS = {
  en:["It compiles. Somewhere, an intern is crying tears of joy. 🥲",
      "It runs. Now go check the output actually matches 👁️",
      "No errors. Suspicious. But let's call it a good sign 👀",
      "Zero crashes. The garbage collector is slacking off today."],
  fr:["Ça compile. Quelque part, un stagiaire pleure de joie. 🥲",
      "Ça tourne. À toi de vérifier que le résultat colle vraiment 👁️",
      "Aucune erreur. Suspect. Mais on va dire que c'est bon signe 👀",
      "Zéro crash. Le garbage collector chôme aujourd'hui."]
};

// juste topic/tagline par niveau -- les exos sont sur Supabase
const LEVEL_META = {
  1:  { topic:"Premiers pas", tagline:"First contact — one character, zero mistakes allowed." },
  2:  { topic:"Boucles & conditions", tagline:"If, else, and a whole lot of loops." },
  3:  { topic:"Strings & maths", tagline:"Words, numbers, and the space between them." },
  4:  { topic:"Structures & primes", tagline:"Arrays, memory, primes — it gets real." },
  5:  { topic:"Slices & recursion", tagline:"Slices, unions, primes, jumps." },
  6:  { topic:"Découpe & tri", tagline:"Cutting, slicing, skipping." },
  7:  { topic:"Mots & paires", tagline:"Flip it, reverse it, rotate it." },
  8:  { topic:"Bits & latin", tagline:"Options, romans, pig latin." },
  9:  { topic:"Piles & calcul", tagline:"Stacks and reverse polish notation." },
  10: { topic:"Le grand saut", tagline:"Brainfuck and regex-like grouping. The final stretch." },
};