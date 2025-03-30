import React,{useEffect,useState} from 'react';
import Navbar from '../components/Navbar';
import { Image, Music, Type, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/user', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
    
      console.log(user)
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <main className="ml-64 p-8">
        <div className="flex items-center gap-4 mb-12">
          <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Welcome to AI Creation Studio
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/image-generation" className="transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1 rounded-2xl shadow-lg group">
              <div className="bg-gray-900 p-6 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:animate-bounce">
                    <Image className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Image Generation</h2>
                </div>
                <p className="text-gray-300">Create stunning AI-generated images from text descriptions</p>
              </div>
            </div>
          </Link>

          <Link to="/music-generation" className="transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-1 rounded-2xl shadow-lg group">
              <div className="bg-gray-900 p-6 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:animate-bounce">
                    <Music className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Music Generation</h2>
                </div>
                <p className="text-gray-300">Generate unique musical compositions using AI</p>
              </div>
            </div>
          </Link>

          <Link to="/text-generation" className="transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-1 rounded-2xl shadow-lg group">
              <div className="bg-gray-900 p-6 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg group-hover:animate-bounce">
                    <Type className="w-6 h-6 text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Text Generation</h2>
                </div>
                <p className="text-gray-300">Create engaging content with AI-powered text generation</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Recent Creations</h2>
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-4 hover:bg-gray-900 transition-all duration-300">
                  <div className="h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-4 animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;