import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Music } from 'lucide-react';

const MusicGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle music generation logic here
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold">Music Generation</h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your music
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  rows={4}
                  placeholder="Describe the style, mood, and elements of the music you want to generate..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:bg-purple-400"
              >
                {loading ? 'Generating...' : 'Generate Music'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Music</h2>
            <div className="text-gray-600">
              Your generated music will appear here
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MusicGeneration;