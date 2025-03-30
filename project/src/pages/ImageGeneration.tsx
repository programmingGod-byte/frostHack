import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';


const convertBlobToBase64 = async (blob:any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl,setImageUrl] = useState('');
  const [user, setUser] = useState(null);
  const [base64ImageUpload,setBase64ImageUpload] = useState('')
  const [images,setImages] = useState([])

  

  useEffect(() => {

    axios
      .get('http://localhost:3000/auth/user', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
    
      // console.log(user)


  }, []);


  useEffect(() => {
    
    if(user){


      axios
      .get(`http://localhost:3000/api/images/${user.id}`, { withCredentials: true })
      .then((res) => {setImages(res.data.images); console.log(res.data)})
      .catch(() => setImages([]));
    


 
    }
  }, [user])
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle image generation logic here
    console.log(prompt)
    console.log(user)


    try {
      let response = await axios.get("http://localhost:8000/generate-image/", {
        params: { prompt },
        responseType: "blob", // Important to handle image response
      });

      // Convert blob to URL for displaying image
      const imageBlob = new Blob([response.data], { type: "image/png" });
      // console.log(imageBlob)
      const imageUrl = URL.createObjectURL(imageBlob);
      const base64Image = await convertBlobToBase64(imageBlob);
      // console.log(base64Image)
      setBase64ImageUpload(base64Image)
      setImages(image=>{
        return [...image,{image:base64Image}]
      })
      setImageUrl(imageUrl);
      console.log(imageUrl)

      let responsetoUplaod = await axios.post("http://localhost:3000/api/upload-image", {
        githubId:user.id,
        base64Image: base64Image,
      });

      console.log("Response:", response.data);
      alert("Image uploaded successfully!");


      
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Check the server logs.");
    }
    finally{
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <main className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <ImageIcon className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Image Generation
            </h1>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg p-8 mb-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Describe your image
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 text-lg"
                  rows={4}
                  placeholder="A mystical forest at twilight, with bioluminescent plants and floating orbs of light..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition duration-300 transform hover:scale-105 text-lg font-medium flex items-center justify-center gap-3 disabled:from-gray-600 disabled:to-gray-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Image
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <ImageIcon className="w-6 h-6 text-blue-400" />
              previous Generated Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from(images).map((element,i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-1 group hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                >
                  <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-gray-600 group-hover:scale-110 transition-transform duration-300">
                      {/* <ImageIcon className="w-12 h-12" /> */}
                      <img src={element.image}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageGeneration;