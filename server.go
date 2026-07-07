// server.go — minimal local server for the Simu Checkpoint app,

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

const geminiModel = "gemini-2.5-flash"

// shape of the request app.js sends (mirrors the Anthropic Messages format)
type incomingRequest struct {
	Messages []struct {
		Role    string `json:"role"`
		Content string `json:"content"`
	} `json:"messages"`
}

// shape of Gemini's generateContent response (only the fields we need)
type geminiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
	Error struct {
		Message string `json:"message"`
	} `json:"error"`
}

func main() {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("GEMINI_API_KEY is not set. Get a free key (no credit card) at https://aistudio.google.com/apikey, then run: export GEMINI_API_KEY=your-key-here")
	}

	http.Handle("/", http.FileServer(http.Dir(".")))

	http.HandleFunc("/api/run", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "could not read request body", http.StatusBadRequest)
			return
		}

		var incoming incomingRequest
		if err := json.Unmarshal(body, &incoming); err != nil || len(incoming.Messages) == 0 {
			http.Error(w, "could not parse request body", http.StatusBadRequest)
			return
		}
		promptText := incoming.Messages[0].Content

		geminiReqBody, _ := json.Marshal(map[string]interface{}{
			"contents": []map[string]interface{}{
				{"parts": []map[string]string{{"text": promptText}}},
			},
		})

		url := fmt.Sprintf("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent", geminiModel)
		req, err := http.NewRequest("POST", url, bytes.NewReader(geminiReqBody))
		if err != nil {
			http.Error(w, "could not build request to Gemini", http.StatusInternalServerError)
			return
		}
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("x-goog-api-key", apiKey)

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			http.Error(w, "could not reach Gemini API: "+err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		respBody, _ := io.ReadAll(resp.Body)

		var parsed geminiResponse
		json.Unmarshal(respBody, &parsed)

		w.Header().Set("Content-Type", "application/json")

		// if Gemini reported an error, forward it in the shape app.js checks for (data.error.message)
		if parsed.Error.Message != "" || resp.StatusCode < 200 || resp.StatusCode >= 300 {
			msg := parsed.Error.Message
			if msg == "" {
				msg = string(respBody)
			}
			json.NewEncoder(w).Encode(map[string]interface{}{
				"error": map[string]string{"message": msg},
			})
			return
		}

		text := ""
		if len(parsed.Candidates) > 0 && len(parsed.Candidates[0].Content.Parts) > 0 {
			text = parsed.Candidates[0].Content.Parts[0].Text
		}

		// reshape into the same {content: [{type, text}]} format app.js already parses
		json.NewEncoder(w).Encode(map[string]interface{}{
			"content": []map[string]string{{"type": "text", "text": text}},
		})
	})

	port := "8080"
	fmt.Println("✅ Server running (using free Gemini API) — open http://localhost:" + port + " in your browser")
	log.Fatal(http.ListenAndServe(":"+port, nil))
}