from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import StreamingResponse, HTMLResponse
import requests
import json

app = FastAPI()

# Ollama API Configuration
OLLAMA_API_URL = "http://localhost:11434/api/generate"
HEADERS = {"Content-Type": "application/json"}

# Streaming Generator Function
def stream_ollama_output(payload: dict):
    try:
        response = requests.post(OLLAMA_API_URL, json=payload, headers=HEADERS, stream=True)

        if response.status_code != 200:
            raise RuntimeError(f"Ollama API Error: {response.text}")

        buffer = ""
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                buffer += chunk.decode("utf-8")
                lines = buffer.split("\n")
                buffer = lines.pop()

                for line in lines:
                    try:
                        parsed_line = json.loads(line)
                        if "response" in parsed_line:
                            yield parsed_line["response"] + "\n"
                    except json.JSONDecodeError:
                        pass 

    except Exception as e:
        yield f"Error: {str(e)}\n"

# FastAPI Endpoint for AI Content Generation
@app.post("/generate-content/")
async def generate_content(prompt: str = Form(...), content_type: str = Form(...)):
    try:
        if content_type not in ["poem", "story"]:
            raise HTTPException(status_code=400, detail="Content type must be 'poem' or 'story'.")

        payload = {
            "model": "mistral:7b",
            "prompt": f"{content_type.capitalize()}: {prompt}",
            "stream": True
        }

        return StreamingResponse(stream_ollama_output(payload), media_type="text/plain")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# HTML Page for User Input
@app.get("/text", response_class=HTMLResponse)
async def text_page():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Text Generator</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; margin: 50px; }
            input, select, button { padding: 10px; margin: 5px; font-size: 16px; }
            #output { border: 1px solid #ccc; padding: 10px; margin-top: 20px; height: 150px; overflow-y: auto; white-space: pre-line; }
        </style>
    </head>
    <body>
        <h2>AI Text Generator</h2>
        <input type="text" id="prompt" placeholder="Enter your prompt..." />
        <select id="content_type">
            <option value="poem">Poem</option>
            <option value="story">Story</option>
        </select>
        <button onclick="generateContent()">Generate</button>
        <div id="output"></div>

        <script>
            function generateContent() {
                const prompt = document.getElementById("prompt").value;
                const contentType = document.getElementById("content_type").value;
                const outputDiv = document.getElementById("output");
                outputDiv.innerHTML = ""; 

                const formData = new FormData();
                formData.append("prompt", prompt);
                formData.append("content_type", contentType);

                fetch("/generate-content/", {
                    method: "POST",
                    body: formData
                })
                .then(response => {
                    if (!response.body) throw new Error("No response body");
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();

                    function readStream() {
                        return reader.read().then(({ done, value }) => {
                            if (done) return;
                            outputDiv.innerHTML += decoder.decode(value, { stream: true }).replace(/\n/g, "<br>");
                            return readStream();
                        });
                    }

                    return readStream();
                })
                .catch(error => {
                    outputDiv.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
                });
            }
        </script>
    </body>
    </html>
    """
