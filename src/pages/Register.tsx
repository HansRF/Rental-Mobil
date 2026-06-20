import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Car, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-brand-primary font-sans">
      <div className="hidden lg:flex bg-brand-primary items-center justify-center p-12 relative overflow-hidden border-r border-brand-border">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-12 flex items-center gap-4">
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <Car size={32} className="text-accent" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight uppercase">VeloDrive</h1>
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-[1.1] uppercase tracking-tighter">Join the elite rental community.</h2>
          <p className="text-text-secondary text-lg leading-relaxed font-medium uppercase tracking-widest">
            Create an account to manage your bookings, save your favorite vehicles, and access exclusive member rewards.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-24 bg-brand-primary lg:bg-brand-primary">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-brand-card p-10 rounded-xl border border-brand-border shadow-2xl"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2 uppercase tracking-tighter">Create Account</h3>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">Join VeloDrive and start your journey today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="Raihan" required />
              <Input label="Last Name" placeholder="Fadhilah" required />
            </div>
            <Input 
              label="Email Address" 
              placeholder="admin@example.com"
              type="email"
              required
            />
            <Input 
              label="Password" 
              placeholder="••••••••"
              type="password"
              required
            />
            

            <Button 
              className="w-full py-4 text-base mt-2" 
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? 'Creating Account...' : 'Get Started'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary font-bold uppercase tracking-widest">
            Already have an account?{' '}
            <Link to="/login" className="font-black text-accent hover:underline">
              Log in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
