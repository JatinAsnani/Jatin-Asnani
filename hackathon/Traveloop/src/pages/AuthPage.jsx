import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useStore } from '../store/useStore';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const login = useStore(state => state.login);

  const handleAuth = (e) => {
    e.preventDefault();
    login({ name: isLogin ? 'Alex' : name, email: 'test@traveloop.com' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex text-white bg-[#050505]">
      {/* Left side: Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12 overflow-hidden">
        {/* Placeholder for an actual beautiful travel image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EA7B7B] to-[#9E3B3B] opacity-80">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-5xl font-bold mb-4 font-serif text-[#FFEAD3]">
            "The journey of a thousand miles begins with a single step."
          </h2>
          <p className="text-white/80 text-lg">
            Join Traveloop and start crafting your perfect itinerary today. 
            Experience seamless planning and luxurious travel organization.
          </p>
        </motion.div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </button>

        <div className="w-full max-w-md">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-10 rounded-3xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-white/60 text-sm">
                {isLogin 
                  ? 'Enter your details to access your trips.' 
                  : 'Sign up to start planning your next adventure.'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-white/40" />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#EA7B7B] transition-colors"
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/40" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#EA7B7B] transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-white/40" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#EA7B7B] transition-colors"
                  required
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs text-[#EA7B7B] hover:text-[#FFEAD3] transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-3.5 bg-[#EA7B7B] text-white rounded-xl font-semibold hover:bg-[#D25353] transition-colors mt-6"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-white/60">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#EA7B7B] font-semibold hover:text-[#FFEAD3] transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
