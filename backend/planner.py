
from openai import OpenAI
client = OpenAI(api_key="OPENAI_KEY")

def plan_actions(prompt, vision):
    full = f"""
Screen description:
{vision}
User request: {prompt}
Return steps in JSON.
"""
    r = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role":"user","content":full}]
    )
    try:
        return eval(r.choices[0].message.content)
    except:
        return []
