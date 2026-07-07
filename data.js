// ============================================================
// data.js — toutes les données / all the content: z01 doc, the
// 10 checkpoints (piscine), exercises (prompt + starting Go
// code), success/fail message banks, and UI strings — all
// bilingual (en/fr). Zero logic here, content only.
// ============================================================

const Z01_DOC = "Le package \"github.com/01-edu/z01\" expose une seule fonction utile ici : func PrintRune(r rune) qui écrit directement le caractère correspondant à r sur la sortie standard (équivalent à fmt.Printf(\"%c\", r)), sans rien ajouter d'autre (pas de retour à la ligne automatique).";

// ---------- UI strings ----------
const STRINGS = {
  select_eyebrow: {en:"Checkpoint Sim · Go Piscine", fr:"Simu Checkpoint · Piscine Go"},
  select_sub: {en:"10 checkpoints, random draw of exercises every run. Editor + simulated terminal on the right, prompt on the left. If it's wrong, it won't give you the answer — just what your code actually produces 😏",
               fr:"10 checkpoints, tirage random d'exos à chaque run. Éditeur + terminal simulé à droite, consigne à gauche. Si c'est faux, ça donne pas la réponse — juste ce que ton code produit vraiment 😏"},
  cursus_sub: {en:"Random draw of exercises, editor + terminal, never the answer.",
               fr:"Tirage random d'exos, éditeur + terminal, jamais la solution."},
  cat_piscine: {en:"🏊 Piscine 01", fr:"🏊 Piscine 01"},
  cat_cursus: {en:"📚 Curriculum", fr:"📚 Cursus 01"},
  cursus_placeholder: {
    en:"😅 <b>Honesty first</b>: I don't have reliable info on <b>curriculum</b> checkpoints (after the piscine) — it depends too much on the school and isn't publicly documented like the piscine is.<br><br>Instead of making up a fake exercise pool, tell me how it actually works for you (a project defense? a mini exam on a specific topic?) and I'll build something that matches reality — or I can make mini-exercises based on <b>your real projects</b> (groupie tracker, etc.) if you'd rather.",
    fr:"😅 <b>Honnêteté oblige</b> : j'ai pas de vraies infos fiables sur les checkpoints du <b>cursus</b> (après la piscine) — ça dépend trop de l'école et c'est pas documenté publiquement comme la piscine.<br><br>Plutôt que d'inventer un faux pool d'exos, dis-moi comment ça se passe vraiment chez toi (genre soutenance de projet ? mini exam sur un thème précis ?) et je te construis un truc qui colle à la réalité — ou je peux te faire des mini-exercices basés sur <b>tes vrais projets</b> (groupie tracker, etc.) si tu préfères."
  },
  bonus_badge: {en:"bonus, less certain", fr:"bonus, moins sûr"},
  rules_random: {en:"Random draw of exercises from the pool — not always the same ones.",
                 fr:"Tirage random d'exercices dans le pool — pas toujours les mêmes."},
  rules_fixed: {en:"This checkpoint is always the same exercise — no random draw.",
                fr:"Ce checkpoint, c'est toujours le même exercice — pas de tirage."},
  rules_editor: {en:"On the right: a mini editor with 2 tabs — the function file (yours to write) and main.go (already written, it calls your function).",
                 fr:"À droite : un mini éditeur avec 2 onglets — le fichier de la fonction (à toi de coder) et main.go (déjà écrit, il appelle ta fonction)."},
  rules_run: {en:'"Run" button to launch your code in the terminal below.',
              fr:'Bouton "Exécuter" pour lancer ton code dans le terminal en dessous.'},
  rules_honesty: {en:"The terminal tells you if it compiles/runs (with a fun little message), but never whether the result is LOGICALLY correct — that part's on you, by reading the output.",
                  fr:"Le terminal te dit si ça compile/tourne (avec un petit mot fun), mais jamais si le résultat est LOGIQUEMENT correct — ça, c'est à toi de checker en lisant la sortie."},
  rules_timer: {en:"Limited time, it keeps running even if you switch exercises.",
                fr:"Chrono limité, il continue même si tu changes d'exercice."},
  rules_bonus_note: {en:"Bonus checkpoint: not officially confirmed by your school — standard Go I built myself to keep you practicing.",
                      fr:"Checkpoint bonus : pas confirmé officiellement par ton école, c'est du Go standard construit par mes soins pour continuer à t'entraîner."},
  rules_cta: {en:"Let's go 🕹️", fr:"C'est parti 🕹️"},
  rules_note: {en:"⚠️ The terminal is an AI-simulated Go compiler (not a real compiler in the browser) — super reliable for exercises like these. And it only works from inside Claude.ai: if you open this file locally on your PC, the Run button gets blocked by the browser (CORS), but you can still read/write your code just fine.",
               fr:"⚠️ Le terminal est un compilo Go simulé par IA (pas un vrai compilo dans le navigateur) — hyper fiable sur ce genre d'exos classiques. Et ça marche QUE depuis Claude.ai : si t'ouvres ce fichier en local sur ton PC, le bouton Exécuter sera bloqué par le navigateur (CORS), mais tu pourras toujours lire/écrire ton code tranquille."},
  change_checkpoint: {en:"← change checkpoint", fr:"← changer de checkpoint"},
  compiling: {en:"Compiling... 🛠️", fr:"Compilation en cours... 🛠️"},
  term_placeholder: {en:"$ go run .\n(nothing yet — click Run)", fr:"$ go run .\n(rien pour l'instant — clique sur Exécuter)"},
  prompt_label: {en:"📋 PROMPT", fr:"📋 CONSIGNE"},
  run_btn: {en:"▶ Run", fr:"▶ Exécuter"},
  clear_btn: {en:"clear", fr:"effacer"},
  prev_btn: {en:"← Previous", fr:"← Précédent"},
  next_btn: {en:"Next →", fr:"Suivant →"},
  finish_now: {en:"Finish the exam now", fr:"Terminer l'exam maintenant"},
  end_title: {en:"Checkpoint complete", fr:"Checkpoint terminé"},
  end_cta: {en:"Draw new exercises, same checkpoint 🔁", fr:"Retirer d'autres exos, même checkpoint 🔁"},
  end_ghost: {en:"← pick another checkpoint", fr:"← choisir un autre checkpoint"},
  cors_error: {en:"🔌 The Run button calls the Claude API, and that only works from inside Claude.ai (the artifact in the chat). Locally on your PC (file opened directly in the browser) or on another site, the browser blocks this call (CORS error) — that's normal, there's no clean way around it without exposing an API key in plain text. To test your code with the terminal, open/reopen this file in a Claude.ai chat.",
              fr:"🔌 Le bouton Exécuter appelle l'API Claude, et ça ne marche QUE depuis l'intérieur de Claude.ai (l'artifact dans le chat). En local sur ton PC (fichier ouvert direct dans le navigateur) ou sur un autre site, le navigateur bloque cet appel (erreur CORS) — normal, y'a pas moyen propre de contourner ça sans exposer une clé API en clair. Pour tester ton code avec le terminal, ouvre/rouvre ce fichier dans un chat Claude.ai."},
  empty_output: {en:"(empty output)", fr:"(sortie vide)"},
};

// ---------- terminal flavor messages ----------
const SUCCESS_MSGS = {
  en:[
    "It compiles. Somewhere, an intern is crying tears of joy. 🥲",
    "Zero crashes detected. The garbage collector is slacking off today.",
    "It runs. The silicon seems pleased, apparently.",
    "No errors. Suspicious. But let's call it a good sign 👀",
    "The compiler has nothing to say. It's almost disappointed it can't complain.",
    "It executes without exploding. The bar was low but it cleared it.",
    "0 errors, 0 cold sweat (this time).",
    "The program runs. Now go check if the result is actually right 👁️",
  ],
  fr:[
    "Ça compile. Quelque part, un stagiaire pleure de joie. 🥲",
    "Zéro crash détecté. Le garbage collector chôme aujourd'hui.",
    "Ça tourne. Le silicium a l'air content, apparemment.",
    "Aucune erreur. Suspect. Mais on va dire que c'est bon signe 👀",
    "Le compilo a rien à redire. Il est même un peu déçu de pas pouvoir râler.",
    "Ça s'exécute sans exploser. La barre est basse mais elle est franchie.",
    "0 erreur, 0 sueur froide (pour cette fois).",
    "Le programme tourne. À toi de checker si le résultat, lui, il est bon 👁️",
  ],
};

const FAIL_MSGS = {
  en:[
    "The compiler has some things to tell you. Many things.",
    "It blew up, but in a good way (figuratively speaking).",
    "One error. Just one. For now, anyway 😅",
    "The code took its shot. The compiler was not impressed.",
    "RIP this run. There'll be others.",
    "Error detected. Somewhere, an engineer sighs.",
    "It doesn't compile. The silicon is on strike today.",
    "The compiler is looking at you with disappointment, but with love.",
  ],
  fr:[
    "Le compilo a des trucs à te dire. Beaucoup de trucs.",
    "Ça a explosé, mais dans le bon sens du terme (façon de parler).",
    "Une erreur. Juste une. Enfin, pour l'instant 😅",
    "Le code a tenté sa chance. Le compilo n'a pas apprécié.",
    "RIP ce run. Y en aura d'autres.",
    "Erreur détectée. Quelque part, un ingénieur soupire.",
    "Ça compile pas. Le silicium fait grève aujourd'hui.",
    "Le compilo te regarde avec déception, mais avec amour.",
  ],
};

// ---------- the 10 checkpoints ----------
const LEVELS = [
  {
    id:'cp1', name:'Checkpoint 1',
    topic:{en:'First contact', fr:'Premier contact'},
    tagline:{en:"The compiler says hi 👋", fr:"Le compilo dit bonjour 👋"},
    fixed:true, confirmed:true,
    exercises:[
      {name:'printletter',
        prompt:{en:"Print only the letter 'a' using z01.PrintRune. Nothing else, nothing more.",
                fr:"Affiche uniquement la lettre 'a' avec z01.PrintRune. Rien d'autre, rien de plus."},
        fnFile:'printletter.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintLetter() {
	// TODO: print the letter 'a'
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintLetter()
}`},
    ],
    timeOptions:[10,15,20]
  },
  {
    id:'cp2', name:'Checkpoint 2',
    topic:{en:'Loops & conditionals', fr:'Boucles & conditions'},
    tagline:{en:"If, else, and a whole lot of loops (watch out for infinite ones)", fr:"If, else, et beaucoup de boucles (attention à l'infini)"},
    confirmed:true,
    exercises:[
      {name:'printalphabet',
        prompt:{en:"Print the whole alphabet in lowercase, one letter after another (no line break between letters), using only z01.PrintRune — no fmt.Print.",
                fr:"Affiche tout l'alphabet en minuscules à la suite (sans saut de ligne entre les lettres), en utilisant uniquement z01.PrintRune — pas de fmt.Print."},
        fnFile:'printalphabet.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintAlphabet() {
	// TODO: print a to z using z01.PrintRune
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintAlphabet()
}`},
      {name:'printreversealphabet',
        prompt:{en:"Same as printalphabet but backwards: from 'z' down to 'a'.",
                fr:"Même chose que printalphabet mais à l'envers : de 'z' jusqu'à 'a'."},
        fnFile:'printreversealphabet.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintReverseAlphabet() {
	// TODO: print z down to a using z01.PrintRune
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintReverseAlphabet()
}`},
      {name:'printdigits',
        prompt:{en:"Print the digits 0 to 9 in a row, still using only z01.PrintRune.",
                fr:"Affiche les chiffres de 0 à 9 à la suite, toujours avec z01.PrintRune uniquement."},
        fnFile:'printdigits.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintDigits() {
	// TODO: print 0123456789
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintDigits()
}`},
      {name:'isnegative',
        prompt:{en:"Write a function that receives an int and prints \"true\" if it's strictly negative, \"false\" otherwise — no fmt, just PrintRune.",
                fr:"Écris une fonction qui reçoit un int et affiche \"true\" s'il est strictement négatif, \"false\" sinon — sans fmt, juste PrintRune."},
        fnFile:'isnegative.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func IsNegative(nb int) {
	// TODO: print "true" or "false"
}`,
        mainCode:`package main

import (
	"piscine"

	"github.com/01-edu/z01"
)

func main() {
	piscine.IsNegative(-5)
	z01.PrintRune('\\n')
	piscine.IsNegative(3)
	z01.PrintRune('\\n')
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp3', name:'Checkpoint 3',
    topic:{en:'Combinatorics & printing', fr:'Combinatoire & affichage'},
    tagline:{en:"Counting to infinity, but properly", fr:"Compter jusqu'à l'infini, mais proprement"},
    confirmed:true,
    exercises:[
      {name:'printcomb',
        prompt:{en:"Print every increasing combination of 3 distinct digits (e.g. 012, 013 ... up to 789), separated by a comma and a space.",
                fr:"Affiche toutes les combinaisons croissantes de 3 chiffres distincts (par ex. 012, 013 ... jusqu'à 789), séparées par une virgule et un espace."},
        fnFile:'printcomb.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintComb() {
	// TODO: 012, 013, ... 789
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintComb()
}`},
      {name:'printcomb2',
        prompt:{en:"A variant of printcomb with 2 letters followed by 2 digits, in a specific order, comma only between two increasing combinations.",
                fr:"Variante de printcomb avec 2 lettres suivies de 2 chiffres, dans un ordre précis, virgule uniquement entre deux combinaisons croissantes."},
        fnFile:'printcomb2.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintComb2() {
	// TODO
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintComb2()
}`},
      {name:'printnbr',
        prompt:{en:"Recode the display of a signed integer (positive or negative) without using fmt, only with PrintRune.",
                fr:"Recode l'affichage d'un entier relatif (positif ou négatif) sans utiliser fmt, uniquement avec PrintRune."},
        fnFile:'printnbr.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintNbr(nb int) {
	// TODO
}`,
        mainCode:`package main

import (
	"piscine"

	"github.com/01-edu/z01"
)

func main() {
	piscine.PrintNbr(42)
	z01.PrintRune('\\n')
	piscine.PrintNbr(-17)
	z01.PrintRune('\\n')
}`},
      {name:'printcombn',
        prompt:{en:"Generalize printcomb: the number of digits to combine is passed as a parameter of the function.",
                fr:"Généralise printcomb : le nombre de chiffres à combiner est passé en paramètre de la fonction."},
        fnFile:'printcombn.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintCombN(n int) {
	// TODO
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintCombN(3)
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp4', name:'Checkpoint 4',
    topic:{en:'Pointers', fr:'Pointeurs'},
    tagline:{en:"References, addresses, and a bit of memory-related existentialism", fr:"Références, adresses, et un peu d'existentialisme mémoire"},
    confirmed:true,
    exercises:[
      {name:'pointone',
        prompt:{en:"Receive a pointer to an int and change the pointed-to value so it becomes 1.",
                fr:"Reçois un pointeur vers un int et modifie la valeur pointée pour qu'elle devienne 1."},
        fnFile:'pointone.go',
        stub:`package piscine

func PointOne(nb *int) {
	// TODO
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	x := 42
	piscine.PointOne(&x)
	fmt.Println(x)
}`},
      {name:'ultimatepointone',
        prompt:{en:"Same idea as pointone, but the function accepts a variable number of pointers (variadic).",
                fr:"Même principe que pointone, mais la fonction accepte un nombre variable de pointeurs (variadic)."},
        fnFile:'ultimatepointone.go',
        stub:`package piscine

func UltimatePointOne(nbs ...*int) {
	// TODO
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	a, b, c := 5, 10, 15
	piscine.UltimatePointOne(&a, &b, &c)
	fmt.Println(a, b, c)
}`},
      {name:'swap',
        prompt:{en:"Swap the values of two integers using pointers.",
                fr:"Échange les valeurs de deux entiers en utilisant des pointeurs."},
        fnFile:'swap.go',
        stub:`package piscine

func Swap(a, b *int) {
	// TODO
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	x, y := 3, 8
	piscine.Swap(&x, &y)
	fmt.Println(x, y)
}`},
      {name:'strrev',
        prompt:{en:"Reverse a string in place, using pointers.",
                fr:"Inverse une chaîne de caractères en place, en manipulant des pointeurs."},
        fnFile:'strrev.go',
        stub:`package piscine

func StrRev(s *string) {
	// TODO
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	s := "salut"
	piscine.StrRev(&s)
	fmt.Println(s)
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp5', name:'Checkpoint 5',
    topic:{en:'Strings, conversions & sorting', fr:'Strings, conversions & tri'},
    tagline:{en:"Strings hate you, it's mutual", fr:"Les strings te détestent, c'est réciproque"},
    confirmed:true,
    exercises:[
      {name:'printstr',
        prompt:{en:"Print a string using only z01.PrintRune, letter by letter.",
                fr:"Affiche une chaîne de caractères en utilisant uniquement z01.PrintRune, lettre par lettre."},
        fnFile:'printstr.go',
        stub:`package piscine

import "github.com/01-edu/z01"

func PrintStr(s string) {
	// TODO
}`,
        mainCode:`package main

import "piscine"

func main() {
	piscine.PrintStr("hello world")
}`},
      {name:'strlen',
        prompt:{en:"Recode a function that calculates the length of a string, without using len() or the strings package.",
                fr:"Recode une fonction qui calcule la longueur d'une chaîne, sans utiliser len() ni le package strings."},
        fnFile:'strlen.go',
        stub:`package piscine

func StrLen(s string) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.StrLen("banane"))
}`},
      {name:'basicatoi',
        prompt:{en:"Convert a string made only of digits (0-9) into an int, without handling the sign.",
                fr:"Convertis une chaîne composée uniquement de chiffres (0-9) en int, sans gérer le signe."},
        fnFile:'basicatoi.go',
        stub:`package piscine

func BasicAtoi(s string) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.BasicAtoi("482"))
}`},
      {name:'atoi',
        prompt:{en:"Full version: handle leading spaces, + and - signs, then convert correctly into an int.",
                fr:"Version complète : gère les espaces au début, les signes + et -, puis convertit correctement en int."},
        fnFile:'atoi.go',
        stub:`package piscine

func Atoi(s string) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.Atoi("  -482"))
}`},
      {name:'divmod',
        prompt:{en:"Write a function that returns both the quotient and the remainder of an integer division between two numbers.",
                fr:"Écris une fonction qui renvoie à la fois le quotient et le reste d'une division entière entre deux nombres."},
        fnFile:'divmod.go',
        stub:`package piscine

func DivMod(a, b int) (int, int) {
	// TODO
	return 0, 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	q, r := piscine.DivMod(17, 5)
	fmt.Println(q, r)
}`},
      {name:'sortintegerable',
        prompt:{en:"Sort a slice of integers by implementing the sorting algorithm yourself (no sort.Ints).",
                fr:"Trie une slice d'entiers en implémentant toi-même l'algorithme de tri (pas sort.Ints)."},
        fnFile:'sortintegerable.go',
        stub:`package piscine

func SortIntegerable(nums []int) []int {
	// TODO
	return nums
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	nums := []int{5, 3, 8, 1, 9, 2}
	fmt.Println(piscine.SortIntegerable(nums))
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp6', name:'Checkpoint 6',
    topic:{en:'Iterative vs recursive', fr:'Itératif vs récursif'},
    tagline:{en:"Recursion calls recursion calls recur...", fr:"La récursion appelle la récursion appelle la récur..."},
    confirmed:true,
    exercises:[
      {name:'iterativefactorial',
        prompt:{en:"Calculate the factorial of a number using a loop.",
                fr:"Calcule la factorielle d'un nombre en utilisant une boucle."},
        fnFile:'iterativefactorial.go',
        stub:`package piscine

func IterativeFactorial(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.IterativeFactorial(5))
}`},
      {name:'recursivefactorial',
        prompt:{en:"Calculate the factorial of a number, but recursively this time — no loops allowed.",
                fr:"Calcule la factorielle d'un nombre, mais cette fois en récursif — aucune boucle autorisée."},
        fnFile:'recursivefactorial.go',
        stub:`package piscine

func RecursiveFactorial(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.RecursiveFactorial(5))
}`},
      {name:'iterativepower',
        prompt:{en:"Calculate base^exponent using a loop.",
                fr:"Calcule base^exposant avec une boucle."},
        fnFile:'iterativepower.go',
        stub:`package piscine

func IterativePower(base, exp int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.IterativePower(2, 10))
}`},
      {name:'recursivepower',
        prompt:{en:"Calculate base^exponent recursively.",
                fr:"Calcule base^exposant en récursif."},
        fnFile:'recursivepower.go',
        stub:`package piscine

func RecursivePower(base, exp int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.RecursivePower(2, 10))
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp7', name:'Checkpoint 7',
    topic:{en:'Sequences & prime numbers', fr:'Suites & nombres premiers'},
    tagline:{en:"Prime numbers never asked anyone for anything", fr:"Les nombres premiers ne demandaient rien à personne"},
    confirmed:true,
    exercises:[
      {name:'fibonacci',
        prompt:{en:"Return the n-th term of the Fibonacci sequence.",
                fr:"Retourne le n-ième terme de la suite de Fibonacci."},
        fnFile:'fibonacci.go',
        stub:`package piscine

func Fibonacci(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.Fibonacci(10))
}`},
      {name:'sqrt',
        prompt:{en:"Calculate the integer square root of a number without using the math package.",
                fr:"Calcule la racine carrée entière d'un nombre sans utiliser le package math."},
        fnFile:'sqrt.go',
        stub:`package piscine

func Sqrt(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.Sqrt(49))
}`},
      {name:'isprime',
        prompt:{en:"Determine whether a given number is prime.",
                fr:"Détermine si un nombre donné est premier."},
        fnFile:'isprime.go',
        stub:`package piscine

func IsPrime(n int) bool {
	// TODO
	return false
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.IsPrime(17))
}`},
      {name:'findnextprime',
        prompt:{en:"Find the first prime number strictly greater than a given number.",
                fr:"Trouve le premier nombre premier strictement supérieur à un nombre donné."},
        fnFile:'findnextprime.go',
        stub:`package piscine

func FindNextPrime(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.FindNextPrime(14))
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp8', name:'Checkpoint 8',
    topic:{en:'Structs & methods', fr:'Structs & méthodes'},
    tagline:{en:"Bonus zone, not officially confirmed — but solid Go 🧭", fr:"Zone bonus, pas confirmée officiellement — mais du Go solide 🧭"},
    confirmed:false,
    exercises:[
      {name:'rectangle_aire',
        prompt:{en:"Define a Rectangle struct with Largeur and Hauteur fields (int), then an Aire function that receives a Rectangle and returns its area.",
                fr:"Définis une struct Rectangle avec des champs Largeur et Hauteur (int), puis une fonction Aire qui reçoit un Rectangle et retourne son aire."},
        fnFile:'rectangle.go',
        stub:`package piscine

type Rectangle struct {
	Largeur int
	Hauteur int
}

func Aire(r Rectangle) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	r := piscine.Rectangle{Largeur: 4, Hauteur: 5}
	fmt.Println(piscine.Aire(r))
}`},
      {name:'point_distance',
        prompt:{en:"Define a Point{X, Y int} struct, then a DistanceCarree method that calculates the squared distance between two points (no need for a square root).",
                fr:"Définis une struct Point{X, Y int}, puis une méthode DistanceCarree qui calcule la distance au carré entre deux points (pas besoin de racine carrée)."},
        fnFile:'point.go',
        stub:`package piscine

type Point struct {
	X int
	Y int
}

func (p Point) DistanceCarree(autre Point) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	a := piscine.Point{X: 0, Y: 0}
	b := piscine.Point{X: 3, Y: 4}
	fmt.Println(a.DistanceCarree(b))
}`},
      {name:'age_moyen',
        prompt:{en:"Define an Animal{Nom string, Age int} struct, then an AgeMoyen function that receives a slice of Animal and returns the average age (integer division).",
                fr:"Définis une struct Animal{Nom string, Age int}, puis une fonction AgeMoyen qui reçoit une slice d'Animal et retourne l'âge moyen (division entière)."},
        fnFile:'animal.go',
        stub:`package piscine

type Animal struct {
	Nom string
	Age int
}

func AgeMoyen(animaux []Animal) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	animaux := []piscine.Animal{
		{Nom: "Oxie", Age: 3},
		{Nom: "Dondon", Age: 5},
		{Nom: "Pepere", Age: 7},
	}
	fmt.Println(piscine.AgeMoyen(animaux))
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp9', name:'Checkpoint 9',
    topic:{en:'Slices & maps', fr:'Slices & maps'},
    tagline:{en:"Still bonus, still unconfirmed, still real Go 🧭", fr:"Toujours bonus, toujours pas confirmé, toujours du vrai Go 🧭"},
    confirmed:false,
    exercises:[
      {name:'mot_plus_long',
        prompt:{en:"Receive a slice of strings and return the longest word.",
                fr:"Reçois une slice de strings et retourne le mot le plus long."},
        fnFile:'motpluslong.go',
        stub:`package piscine

func MotPlusLong(mots []string) string {
	// TODO
	return ""
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	mots := []string{"chat", "hippopotame", "chien"}
	fmt.Println(piscine.MotPlusLong(mots))
}`},
      {name:'compteur_mots',
        prompt:{en:"Receive a slice of strings and return a map[string]int counting how many times each word appears.",
                fr:"Reçois une slice de strings et retourne une map[string]int qui compte le nombre d'occurrences de chaque mot."},
        fnFile:'compteurmots.go',
        stub:`package piscine

func CompteurMots(mots []string) map[string]int {
	// TODO
	return map[string]int{}
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	mots := []string{"chat", "chien", "chat", "oiseau", "chat"}
	fmt.Println(piscine.CompteurMots(mots))
}`},
      {name:'plus_grand',
        prompt:{en:"Receive a slice of ints and return the largest element.",
                fr:"Reçois une slice d'int et retourne le plus grand élément."},
        fnFile:'plusgrand.go',
        stub:`package piscine

func PlusGrand(nums []int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	fmt.Println(piscine.PlusGrand([]int{4, 9, 2, 7, 5}))
}`},
    ],
    timeOptions:[30,45,60]
  },
  {
    id:'cp10', name:'Checkpoint 10',
    topic:{en:'Errors & interfaces', fr:'Erreurs & interfaces'},
    tagline:{en:"Final bonus — Go that handles (or doesn't) its errors 🧭", fr:"Bonus final — le Go qui gère (ou pas) ses erreurs 🧭"},
    confirmed:false,
    exercises:[
      {name:'division_safe',
        prompt:{en:"Write a function that divides two integers and returns an error if the divisor is 0, instead of crashing.",
                fr:"Écris une fonction qui divise deux entiers et retourne une erreur si le diviseur est 0, au lieu de planter."},
        fnFile:'divisionsafe.go',
        stub:`package piscine

import "errors"

func DivisionSafe(a, b int) (int, error) {
	// TODO
	return 0, errors.New("not implemented yet")
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	res, err := piscine.DivisionSafe(10, 0)
	if err != nil {
		fmt.Println("error:", err)
	} else {
		fmt.Println(res)
	}
}`},
      {name:'forme_interface',
        prompt:{en:"Define a Forme interface with an Aire() int method, then make a Carre{Cote int} implement it.",
                fr:"Définis une interface Forme avec une méthode Aire() int, puis fais en sorte qu'un Carre{Cote int} l'implémente."},
        fnFile:'forme.go',
        stub:`package piscine

type Forme interface {
	Aire() int
}

type Carre struct {
	Cote int
}

func (c Carre) Aire() int {
	// TODO
	return 0
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	var f piscine.Forme = piscine.Carre{Cote: 6}
	fmt.Println(f.Aire())
}`},
      {name:'temperature_string',
        prompt:{en:"Implement the String() method on a Temperature (float64) type so it prints with a ° at the end when you fmt.Println it.",
                fr:"Implémente la méthode String() sur un type Temperature (float64) pour qu'elle s'affiche avec un ° à la fin quand on fait fmt.Println dessus."},
        fnFile:'temperature.go',
        stub:`package piscine

type Temperature float64

func (t Temperature) String() string {
	// TODO
	return ""
}`,
        mainCode:`package main

import (
	"fmt"
	"piscine"
)

func main() {
	t := piscine.Temperature(21.5)
	fmt.Println(t)
}`},
    ],
    timeOptions:[30,45,60]
  },
];