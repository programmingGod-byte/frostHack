

import os
import requests

API_KEY = "key_4ea2d9c68f2b73f27dc83f87eb92fadc803ac0fd69bd020c9128f4c4ed6e01dcdb9b65171583903df4472737c0818b826d2d13a0278b805526c78b2d694ec6ad"  # Replace with your actual API key
RUNWAY_API_URL = "https://api.runwayml.com/v1/video/generate"


def generate_video(prompt):
    """Generates video using Runway API and saves it locally."""
    payload = {
        "prompt": prompt,
        "fps": 24,
        "duration": 4,
        "resolution": "720p"
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(RUNWAY_API_URL, json=payload, headers=headers)

    if response.status_code == 200:
        video_url = response.json().get("video_url")
        if video_url:
            save_video(video_url, "generated_video.mp4")
            return f"✅ Video saved as 'generated_video.mp4'"
        else:
            return "❌ Error: No video URL received."
    else:
        return f"❌ Error: {response.text}"

def save_video(video_url, filename):
    """Downloads and saves the video file."""
    response = requests.get(video_url, stream=True)
    if response.status_code == 200:
        with open(filename, "wb") as file:
            for chunk in response.iter_content(chunk_size=1024):
                file.write(chunk)
        print(f"✅ Video saved as {filename}")
    else:
        print("❌ Failed to download video.")

# Example Usage
print(generate_video("A futuristic city at sunset, cinematic style."))




