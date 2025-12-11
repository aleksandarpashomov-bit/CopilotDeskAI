const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});


// -------------------- SCREENSHOT --------------------

ipcMain.handle("capture-screen", async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });
    return sources[0].thumbnail.toPNG().toString("base64");
});


// -------------------- GPT-4o VISION ANALYSIS --------------------

ipcMain.handle("analyze-image", async (_, base64Image, userText) => {
    try {
        const promptText = userText || "Describe the screen and give instructions.";

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: promptText },
                            { type: "image_url", image_url: `data:image/png;base64,${base64Image}` }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        return "Error: " + error.message;
    }
});
