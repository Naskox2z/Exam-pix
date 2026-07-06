// ============================================================
// data.js — toutes les données : doc du package z01, les 10
// checkpoints (piscine), les exercices (énoncé + code Go de
// départ), et les banques de messages fun succès/échec.
// Zéro logique ici, que du contenu.
// ============================================================

const Z01_DOC = "Le package \"github.com/01-edu/z01\" expose une seule fonction utile ici : func PrintRune(r rune) qui écrit directement le caractère correspondant à r sur la sortie standard (équivalent à fmt.Printf(\"%c\", r)), sans rien ajouter d'autre (pas de retour à la ligne automatique).";

const SUCCESS_MSGS = [
  "Ça compile. Quelque part, un stagiaire pleure de joie. 🥲",
  "Zéro crash détecté. Le garbage collector chôme aujourd'hui.",
  "Ça tourne. Le silicium a l'air content, apparemment.",
  "Aucune erreur. Suspect. Mais on va dire que c'est bon signe 👀",
  "Le compilo a rien à redire. Il est même un peu déçu de pas pouvoir râler.",
  "Ça s'exécute sans exploser. La barre est basse mais elle est franchie.",
  "0 erreur, 0 sueur froide (pour cette fois).",
  "Le programme tourne. À toi de checker si le résultat, lui, il est bon 👁️",
];

const FAIL_MSGS = [
  "Le compilo a des trucs à te dire. Beaucoup de trucs.",
  "Ça a explosé, mais dans le bon sens du terme (façon de parler).",
  "Une erreur. Juste une. Enfin, pour l'instant 😅",
  "Le code a tenté sa chance. Le compilo n'a pas apprécié.",
  "RIP ce run. Y en aura d'autres.",
  "Erreur détectée. Quelque part, un ingénieur soupire.",
  "Ça compile pas. Le silicium fait grève aujourd'hui.",
  "Le compilo te regarde avec déception, mais avec amour.",
];

const LEVELS = [
  // ---------------------------------------------------------
  {
    id:'cp1', name:'Checkpoint 1', topic:'Premier contact',
    tagline:"Le compilo dit bonjour 👋",
    fixed:true,
    confirmed:true,
    exercises:[
      {name:'printletter', prompt:"Affiche uniquement la lettre 'a' avec z01.PrintRune. Rien d'autre, rien de plus.",
        fnFile:'printletter.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintLetter() {
	// TODO : affiche la lettre 'a'
}`,
        mainCode:`package main

func main() {
	PrintLetter()
}`},
    ],
    timeOptions:[10,15,20]
  },
  // ---------------------------------------------------------
  {
    id:'cp2', name:'Checkpoint 2', topic:'Boucles & conditions',
    tagline:"If, else, et beaucoup de boucles (attention à l'infini)",
    confirmed:true,
    exercises:[
      {name:'printalphabet', prompt:"Affiche tout l'alphabet en minuscules à la suite (sans saut de ligne entre les lettres), en utilisant uniquement z01.PrintRune — pas de fmt.Print.",
        fnFile:'printalphabet.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintAlphabet() {
	// TODO : affiche a à z avec z01.PrintRune
}`,
        mainCode:`package main

func main() {
	PrintAlphabet()
}`},
      {name:'printreversealphabet', prompt:"Même chose que printalphabet mais à l'envers : de 'z' jusqu'à 'a'.",
        fnFile:'printreversealphabet.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintReverseAlphabet() {
	// TODO : affiche z à a avec z01.PrintRune
}`,
        mainCode:`package main

func main() {
	PrintReverseAlphabet()
}`},
      {name:'printdigits', prompt:"Affiche les chiffres de 0 à 9 à la suite, toujours avec z01.PrintRune uniquement.",
        fnFile:'printdigits.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintDigits() {
	// TODO : affiche 0123456789
}`,
        mainCode:`package main

func main() {
	PrintDigits()
}`},
      {name:'isnegative', prompt:"Écris une fonction qui reçoit un int et affiche \"true\" s'il est strictement négatif, \"false\" sinon — sans fmt, juste PrintRune.",
        fnFile:'isnegative.go',
        stub:`package main

import "github.com/01-edu/z01"

func IsNegative(nb int) {
	// TODO : affiche "true" ou "false"
}`,
        mainCode:`package main

import "github.com/01-edu/z01"

func main() {
	IsNegative(-5)
	z01.PrintRune('\\n')
	IsNegative(3)
	z01.PrintRune('\\n')
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp3', name:'Checkpoint 3', topic:'Combinatoire & affichage',
    tagline:"Compter jusqu'à l'infini, mais proprement",
    confirmed:true,
    exercises:[
      {name:'printcomb', prompt:"Affiche toutes les combinaisons croissantes de 3 chiffres distincts (par ex. 012, 013 ... jusqu'à 789), séparées par une virgule et un espace.",
        fnFile:'printcomb.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintComb() {
	// TODO : 012, 013, ... 789
}`,
        mainCode:`package main

func main() {
	PrintComb()
}`},
      {name:'printcomb2', prompt:"Variante de printcomb avec 2 lettres suivies de 2 chiffres, dans un ordre précis, virgule uniquement entre deux combinaisons croissantes.",
        fnFile:'printcomb2.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintComb2() {
	// TODO
}`,
        mainCode:`package main

func main() {
	PrintComb2()
}`},
      {name:'printnbr', prompt:"Recode l'affichage d'un entier relatif (positif ou négatif) sans utiliser fmt, uniquement avec PrintRune.",
        fnFile:'printnbr.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintNbr(nb int) {
	// TODO
}`,
        mainCode:`package main

import "github.com/01-edu/z01"

func main() {
	PrintNbr(42)
	z01.PrintRune('\\n')
	PrintNbr(-17)
	z01.PrintRune('\\n')
}`},
      {name:'printcombn', prompt:"Généralise printcomb : le nombre de chiffres à combiner est passé en paramètre de la fonction.",
        fnFile:'printcombn.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintCombN(n int) {
	// TODO
}`,
        mainCode:`package main

func main() {
	PrintCombN(3)
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp4', name:'Checkpoint 4', topic:'Pointeurs',
    tagline:"Références, adresses, et un peu d'existentialisme mémoire",
    confirmed:true,
    exercises:[
      {name:'pointone', prompt:"Reçois un pointeur vers un int et modifie la valeur pointée pour qu'elle devienne 1.",
        fnFile:'pointone.go',
        stub:`package main

func PointOne(nb *int) {
	// TODO
}`,
        mainCode:`package main

import "fmt"

func main() {
	x := 42
	PointOne(&x)
	fmt.Println(x)
}`},
      {name:'ultimatepointone', prompt:"Même principe que pointone, mais la fonction accepte un nombre variable de pointeurs (variadic).",
        fnFile:'ultimatepointone.go',
        stub:`package main

func UltimatePointOne(nbs ...*int) {
	// TODO
}`,
        mainCode:`package main

import "fmt"

func main() {
	a, b, c := 5, 10, 15
	UltimatePointOne(&a, &b, &c)
	fmt.Println(a, b, c)
}`},
      {name:'swap', prompt:"Échange les valeurs de deux entiers en utilisant des pointeurs.",
        fnFile:'swap.go',
        stub:`package main

func Swap(a, b *int) {
	// TODO
}`,
        mainCode:`package main

import "fmt"

func main() {
	x, y := 3, 8
	Swap(&x, &y)
	fmt.Println(x, y)
}`},
      {name:'strrev', prompt:"Inverse une chaîne de caractères en place, en manipulant des pointeurs.",
        fnFile:'strrev.go',
        stub:`package main

func StrRev(s *string) {
	// TODO
}`,
        mainCode:`package main

import "fmt"

func main() {
	s := "salut"
	StrRev(&s)
	fmt.Println(s)
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp5', name:'Checkpoint 5', topic:'Strings, conversions & tri',
    tagline:"Les strings te détestent, c'est réciproque",
    confirmed:true,
    exercises:[
      {name:'printstr', prompt:"Affiche une chaîne de caractères en utilisant uniquement z01.PrintRune, lettre par lettre.",
        fnFile:'printstr.go',
        stub:`package main

import "github.com/01-edu/z01"

func PrintStr(s string) {
	// TODO
}`,
        mainCode:`package main

func main() {
	PrintStr("hello world")
}`},
      {name:'strlen', prompt:"Recode une fonction qui calcule la longueur d'une chaîne, sans utiliser len() ni le package strings.",
        fnFile:'strlen.go',
        stub:`package main

func StrLen(s string) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(StrLen("banane"))
}`},
      {name:'basicatoi', prompt:"Convertis une chaîne composée uniquement de chiffres (0-9) en int, sans gérer le signe.",
        fnFile:'basicatoi.go',
        stub:`package main

func BasicAtoi(s string) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(BasicAtoi("482"))
}`},
      {name:'atoi', prompt:"Version complète : gère les espaces au début, les signes + et -, puis convertit correctement en int.",
        fnFile:'atoi.go',
        stub:`package main

func Atoi(s string) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(Atoi("  -482"))
}`},
      {name:'divmod', prompt:"Écris une fonction qui renvoie à la fois le quotient et le reste d'une division entière entre deux nombres.",
        fnFile:'divmod.go',
        stub:`package main

func DivMod(a, b int) (int, int) {
	// TODO
	return 0, 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	q, r := DivMod(17, 5)
	fmt.Println(q, r)
}`},
      {name:'sortintegerable', prompt:"Trie une slice d'entiers en implémentant toi-même l'algorithme de tri (pas sort.Ints).",
        fnFile:'sortintegerable.go',
        stub:`package main

func SortIntegerable(nums []int) []int {
	// TODO
	return nums
}`,
        mainCode:`package main

import "fmt"

func main() {
	nums := []int{5, 3, 8, 1, 9, 2}
	fmt.Println(SortIntegerable(nums))
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp6', name:'Checkpoint 6', topic:'Itératif vs récursif',
    tagline:"La récursion appelle la récursion appelle la récur...",
    confirmed:true,
    exercises:[
      {name:'iterativefactorial', prompt:"Calcule la factorielle d'un nombre en utilisant une boucle.",
        fnFile:'iterativefactorial.go',
        stub:`package main

func IterativeFactorial(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(IterativeFactorial(5))
}`},
      {name:'recursivefactorial', prompt:"Calcule la factorielle d'un nombre, mais cette fois en récursif — aucune boucle autorisée.",
        fnFile:'recursivefactorial.go',
        stub:`package main

func RecursiveFactorial(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(RecursiveFactorial(5))
}`},
      {name:'iterativepower', prompt:"Calcule base^exposant avec une boucle.",
        fnFile:'iterativepower.go',
        stub:`package main

func IterativePower(base, exp int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(IterativePower(2, 10))
}`},
      {name:'recursivepower', prompt:"Calcule base^exposant en récursif.",
        fnFile:'recursivepower.go',
        stub:`package main

func RecursivePower(base, exp int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(RecursivePower(2, 10))
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp7', name:'Checkpoint 7', topic:'Suites & nombres premiers',
    tagline:"Les nombres premiers ne demandaient rien à personne",
    confirmed:true,
    exercises:[
      {name:'fibonacci', prompt:"Retourne le n-ième terme de la suite de Fibonacci.",
        fnFile:'fibonacci.go',
        stub:`package main

func Fibonacci(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(Fibonacci(10))
}`},
      {name:'sqrt', prompt:"Calcule la racine carrée entière d'un nombre sans utiliser le package math.",
        fnFile:'sqrt.go',
        stub:`package main

func Sqrt(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(Sqrt(49))
}`},
      {name:'isprime', prompt:"Détermine si un nombre donné est premier.",
        fnFile:'isprime.go',
        stub:`package main

func IsPrime(n int) bool {
	// TODO
	return false
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(IsPrime(17))
}`},
      {name:'findnextprime', prompt:"Trouve le premier nombre premier strictement supérieur à un nombre donné.",
        fnFile:'findnextprime.go',
        stub:`package main

func FindNextPrime(n int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(FindNextPrime(14))
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp8', name:'Checkpoint 8', topic:'Structs & méthodes',
    tagline:"Zone bonus, pas confirmée officiellement — mais du Go solide 🧭",
    confirmed:false,
    exercises:[
      {name:'rectangle_aire', prompt:"Définis une struct Rectangle avec des champs Largeur et Hauteur (int), puis une fonction Aire qui reçoit un Rectangle et retourne son aire.",
        fnFile:'rectangle.go',
        stub:`package main

type Rectangle struct {
	Largeur int
	Hauteur int
}

func Aire(r Rectangle) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	r := Rectangle{Largeur: 4, Hauteur: 5}
	fmt.Println(Aire(r))
}`},
      {name:'point_distance', prompt:"Définis une struct Point{X, Y int}, puis une méthode DistanceCarree qui calcule la distance au carré entre deux points (pas besoin de racine carrée).",
        fnFile:'point.go',
        stub:`package main

type Point struct {
	X int
	Y int
}

func (p Point) DistanceCarree(autre Point) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	a := Point{X: 0, Y: 0}
	b := Point{X: 3, Y: 4}
	fmt.Println(a.DistanceCarree(b))
}`},
      {name:'age_moyen', prompt:"Définis une struct Animal{Nom string, Age int}, puis une fonction AgeMoyen qui reçoit une slice d'Animal et retourne l'âge moyen (division entière).",
        fnFile:'animal.go',
        stub:`package main

type Animal struct {
	Nom string
	Age int
}

func AgeMoyen(animaux []Animal) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	animaux := []Animal{
		{Nom: "Oxie", Age: 3},
		{Nom: "Dondon", Age: 5},
		{Nom: "Pepere", Age: 7},
	}
	fmt.Println(AgeMoyen(animaux))
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp9', name:'Checkpoint 9', topic:'Slices & maps',
    tagline:"Toujours bonus, toujours pas confirmé, toujours du vrai Go 🧭",
    confirmed:false,
    exercises:[
      {name:'mot_plus_long', prompt:"Reçois une slice de strings et retourne le mot le plus long.",
        fnFile:'motpluslong.go',
        stub:`package main

func MotPlusLong(mots []string) string {
	// TODO
	return ""
}`,
        mainCode:`package main

import "fmt"

func main() {
	mots := []string{"chat", "hippopotame", "chien"}
	fmt.Println(MotPlusLong(mots))
}`},
      {name:'compteur_mots', prompt:"Reçois une slice de strings et retourne une map[string]int qui compte le nombre d'occurrences de chaque mot.",
        fnFile:'compteurmots.go',
        stub:`package main

func CompteurMots(mots []string) map[string]int {
	// TODO
	return map[string]int{}
}`,
        mainCode:`package main

import "fmt"

func main() {
	mots := []string{"chat", "chien", "chat", "oiseau", "chat"}
	fmt.Println(CompteurMots(mots))
}`},
      {name:'plus_grand', prompt:"Reçois une slice d'int et retourne le plus grand élément.",
        fnFile:'plusgrand.go',
        stub:`package main

func PlusGrand(nums []int) int {
	// TODO
	return 0
}`,
        mainCode:`package main

import "fmt"

func main() {
	fmt.Println(PlusGrand([]int{4, 9, 2, 7, 5}))
}`},
    ],
    timeOptions:[30,45,60]
  },
  // ---------------------------------------------------------
  {
    id:'cp10', name:'Checkpoint 10', topic:'Erreurs & interfaces',
    tagline:"Bonus final — le Go qui gère (ou pas) ses erreurs 🧭",
    confirmed:false,
    exercises:[
      {name:'division_safe', prompt:"Écris une fonction qui divise deux entiers et retourne une erreur si le diviseur est 0, au lieu de planter.",
        fnFile:'divisionsafe.go',
        stub:`package main

import "errors"

func DivisionSafe(a, b int) (int, error) {
	// TODO
	return 0, errors.New("pas encore codé")
}`,
        mainCode:`package main

import "fmt"

func main() {
	res, err := DivisionSafe(10, 0)
	if err != nil {
		fmt.Println("erreur:", err)
	} else {
		fmt.Println(res)
	}
}`},
      {name:'forme_interface', prompt:"Définis une interface Forme avec une méthode Aire() int, puis fais en sorte qu'un Carre{Cote int} l'implémente.",
        fnFile:'forme.go',
        stub:`package main

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

import "fmt"

func main() {
	var f Forme = Carre{Cote: 6}
	fmt.Println(f.Aire())
}`},
      {name:'temperature_string', prompt:"Implémente la méthode String() sur un type Temperature (float64) pour qu'elle s'affiche avec un ° à la fin quand on fait fmt.Println dessus.",
        fnFile:'temperature.go',
        stub:`package main

type Temperature float64

func (t Temperature) String() string {
	// TODO
	return ""
}`,
        mainCode:`package main

import "fmt"

func main() {
	t := Temperature(21.5)
	fmt.Println(t)
}`},
    ],
    timeOptions:[30,45,60]
  },
];