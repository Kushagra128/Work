import sys
import json
import speech_recognition as sr
from googletrans import Translator
import base64
import os

recognizer = sr.Recognizer()
translator = Translator()

def speech_to_text(audio_data):
    try:
        audio_bytes = base64.b64decode(audio_data)
        with open("temp.wav", "wb") as f:
            f.write(audio_bytes)
        with sr.AudioFile("temp.wav") as source:
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
        os.remove("temp.wav")
        return text
    except sr.UnknownValueError:
        print("Could not understand audio.")
        return ""
    except sr.RequestError as e:
        print(f"Speech Recognition Request Error: {e}")
        return ""
    except Exception as e:
        print(f"Speech-to-Text Error: {e}")
        return ""

def translate_text(text, from_lang="en", to_lang="hi"):
    try:
        if from_lang == to_lang:
            return text
        translated = translator.translate(text, src=from_lang, dest=to_lang)
        return translated.text
    except Exception as e:
        print(f"Translation Error: {e}")
        return text

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    action = input_data.get("action", "translate")

    if action == "speech_to_text":
        audio_data = input_data["audioData"]
        text = speech_to_text(audio_data)
        output = {"text": text}
        print(json.dumps(output))
    elif action == "translate":
        text = input_data["text"]
        from_lang = input_data.get("fromLang", "en")
        to_lang = input_data.get("toLang", "hi")
        translated_text = translate_text(text, from_lang, to_lang)
        output = {"translatedText": translated_text}
        print(json.dumps(output))
    sys.stdout.flush()