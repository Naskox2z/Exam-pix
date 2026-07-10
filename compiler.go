// compiler.go -- un VRAI compilo, pas une IA qui fait semblant.
// Recoit le code de l'exercice, l'ecrit dans un dossier temporaire,
// lance un vrai "go run .", renvoie la vraie sortie.

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

type compileRequest struct {
	FnFile      string `json:"fnFile"`      // ex: "rectperimeter.go" ou "main.go"
	StudentCode string `json:"studentCode"` // ce que la personne a ecrit
	MainCode    string `json:"mainCode"`    // vide si style "program" (un seul fichier)
	IsFunction  bool   `json:"isFunction"`  // true si fichier fonction + main.go separes
}

type compileResponse struct {
	IsErr bool   `json:"isErr"`
	Text  string `json:"text"`
}

func main() {
	http.HandleFunc("/", handleCompile) // repond sur n'importe quel chemin, plus sur avec le routage par chemin d'AlwaysData

	ip := os.Getenv("IP")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	addr := ip + ":" + port
	fmt.Println("✅ Compiler server listening on " + addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		fmt.Println("error:", err)
	}
}

func handleCompile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "OPTIONS" {
		return
	}
	if r.Method != "POST" {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req compileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	resp := runGoCode(req)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func runGoCode(req compileRequest) compileResponse {
	tmpDir, err := os.MkdirTemp("", "compile-*")
	if err != nil {
		return compileResponse{IsErr: true, Text: "internal error creating temp dir"}
	}
	defer os.RemoveAll(tmpDir) // nettoyage systematique, meme si ca plante

	needsZ01 := strings.Contains(req.MainCode, "github.com/01-edu/z01")
	if needsZ01 {
		z01Dir := filepath.Join(tmpDir, "z01vendor")
		os.MkdirAll(z01Dir, 0755)
		os.WriteFile(filepath.Join(z01Dir, "z01.go"), []byte("package z01\n\nimport \"os\"\n\nfunc PrintRune(r rune) {\n\tos.Stdout.WriteString(string(r))\n}\n"), 0644)
		os.WriteFile(filepath.Join(z01Dir, "go.mod"), []byte("module github.com/01-edu/z01\n\ngo 1.22\n"), 0644)
	}

	if req.IsFunction {
		// package piscine dans un sous-dossier, main.go a la racine qui l'importe
		piscineDir := filepath.Join(tmpDir, "piscine")
		os.MkdirAll(piscineDir, 0755)
		os.WriteFile(filepath.Join(piscineDir, req.FnFile), []byte(req.StudentCode), 0644)
		os.WriteFile(filepath.Join(piscineDir, "go.mod"), []byte("module piscine\n\ngo 1.22\n"), 0644)

		os.WriteFile(filepath.Join(tmpDir, "main.go"), []byte(req.MainCode), 0644)
		modContent := "module student\n\ngo 1.22\n\nrequire piscine v0.0.0\n\nreplace piscine => ./piscine\n"
		if needsZ01 {
			modContent += "\nrequire github.com/01-edu/z01 v0.0.0\n\nreplace github.com/01-edu/z01 => ./z01vendor\n"
		}
		os.WriteFile(filepath.Join(tmpDir, "go.mod"), []byte(modContent), 0644)
	} else {
		// un seul fichier, package main directement
		os.WriteFile(filepath.Join(tmpDir, req.FnFile), []byte(req.StudentCode), 0644)
		modContent := "module student\n\ngo 1.22\n"
		if needsZ01 {
			modContent += "\nrequire github.com/01-edu/z01 v0.0.0\n\nreplace github.com/01-edu/z01 => ./z01vendor\n"
		}
		os.WriteFile(filepath.Join(tmpDir, "go.mod"), []byte(modContent), 0644)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second) // pas de boucle infinie qui bloque le serveur
	defer cancel()
	cmd := exec.CommandContext(ctx, "go", "run", ".")
	cmd.Dir = tmpDir
	out, err := cmd.CombinedOutput()

	if err != nil {
		return compileResponse{IsErr: true, Text: string(out)}
	}
	return compileResponse{IsErr: false, Text: string(out)}
}