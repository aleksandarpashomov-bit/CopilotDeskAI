document.getElementById("screenshotBtn").addEventListener("click", async () => {
    const output = document.getElementById("output");
    const userText = document.getElementById("askInput").value;

    output.innerText = "📸 Capturing screenshot...";

    const image = await window.api.captureScreen();

    output.innerText = "🤖 Analyzing screen with GPT-4o...";

    const response = await window.api.analyzeImage(image, userText);

    output.innerText = response;
});
