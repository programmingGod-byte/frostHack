import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Github, Mail, Sparkles } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),rgba(0,0,0,0))]" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/10 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-md w-full relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 animate-pulse" />
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative border border-gray-800">
          <div className="flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
            <Wand2 className="w-12 h-12 text-purple-400 relative animate-bounce" />
            <Sparkles className="w-4 h-4 text-purple-400 absolute -right-1 top-0 animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Create Account
          </h2>

          <div className="space-y-4 mb-6">
            <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              <Mail className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105">
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Choose a password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;