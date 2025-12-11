
import pyautogui, time
from stop import stop_flag

def execute_steps(steps):
    for s in steps:
        if stop_flag: break
        if s.get("action")=="click":
            pyautogui.click(s["x"], s["y"])
        if s.get("action")=="type":
            pyautogui.write(s["value"])
        if s.get("action")=="key":
            pyautogui.press(s["value"])
        time.sleep(0.2)
