import requests
import json

url = "https://modelslab.com/api/v6/video/text2video"

payload = json.dumps({
  "key":"w6jEmLQuSEnzTfaAabUhOOxqxf1oCFOi3qeJqqrjoM1Ljvx6dW3eoVPBixBR",
    "model_id":"cogvideox",
    "prompt":"Space Station in space",
    "negative_prompt":"low quality",
    "height":512,
    "width":512,
    "num_frames":25,
    "num_inference_steps":20,
    "guidance_scale":7,
    "upscale_height":640,
    "upscale_width":1024,
    "upscale_strength":0.6,
    "upscale_guidance_scale":12,
    "upscale_num_inference_steps":20,
    "output_type":"gif",
    "webhook":None,
    "track_id":None
})

headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)