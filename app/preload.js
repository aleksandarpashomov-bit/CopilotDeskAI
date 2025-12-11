const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    captureScreen: () => ipcRenderer.invoke("capture-screen"),
    analyzeImage: (image, text) => ipcRenderer.invoke("analyze-image", image, text)
});
