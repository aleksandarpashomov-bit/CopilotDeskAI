
import pyautogui
import base64
import google.generativeai as genai

genai.configure(api_key="GEMINI_KEY")

def analyze_screen():
    screenshot = pyautogui.screenshot()
    screenshot.save("screen.png")
    with open("screen.png","rb") as f: data=f.read()
    img_b64 = base64.b64encode(data).decode()

    model = genai.GenerativeModel("gemini-2.0-flash")
    res = model.generate_content(["Describe UI:", {"image": img_b64}])
    return res.text
