from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from diffusers import StableDiffusionPipeline
import torch
import os
import gc

# Create the FastAPI app
app = FastAPI()

# Load the Stable Diffusion model with optimizations
try:
    pipeline = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", torch_dtype=torch.float16)
    pipeline.to("cuda")  # Use GPU for faster processing
    pipeline.enable_attention_slicing()  # Reduce memory usage
    pipeline.enable_xformers_memory_efficient_attention()  # Efficient memory usage
except Exception as e:
    print(f"Error loading the model: {str(e)}")
    raise RuntimeError("Failed to initialize the model.")

# Initialize an empty list to store history
history = []

# Define the route for generating images
@app.get("/generate-image/")
async def generate_image(prompt: str):
    try:
        # Validate the prompt
        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt cannot be empty")

        # Free up GPU memory
        torch.cuda.empty_cache()
        gc.collect()

        # Generate the image
        image = pipeline(prompt, height=512, width=512).images[0]

        # Save the image locally with a unique name
        output_path = f"generated_image_{len(history) + 1}.png"
        image.save(output_path)

        # Add the prompt and image path to the history
        history.append({"prompt": prompt, "image_path": output_path})

        # Return the generated image as a response
        return FileResponse(output_path, media_type="image/png", filename=os.path.basename(output_path))

    except torch.cuda.OutOfMemoryError:
        torch.cuda.empty_cache()
        raise HTTPException(status_code=500, detail="CUDA out of memory. Please try reducing the image resolution or use FP16 precision.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")

# Define the route for retrieving history
@app.get("/history/")
async def get_history():
    try:
        # Return the history as JSON
        if not history:
            return JSONResponse(content={"message": "No history available yet"})
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving history: {str(e)}")
