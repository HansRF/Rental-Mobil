import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Car, Mail, Lock, ArrowRight } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { supabase } from "../lib/supabase";
export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 2. Tambahkan state untuk email, password, dan error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsLoading(true);
  setErrorMsg(null);

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      throw new Error("Email atau password salah");
    }

    localStorage.setItem("user", JSON.stringify(data));

    if (data.role === "admin") {
      navigate("/dashboard");
    } else if (data.role === "staff") {
      navigate("/dashboard");
    } else {
      navigate("/booking");
    }

  } catch (error: any) {
    setErrorMsg(error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-brand-primary">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex bg-brand-primary items-center justify-center p-12 relative overflow-hidden border-r border-brand-border">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <div className="mb-12 flex items-center gap-4">
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <Car size={32} className="text-accent" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight uppercase">
              VeloDrive
            </h1>
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-[1.1] uppercase tracking-tighter">
            The Future of Premium Rentals starts here.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed font-medium uppercase tracking-widest">
            Experience the thrill of the road with our curated fleet of
            high-performance and luxury vehicles.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-24 bg-brand-primary lg:bg-brand-primary">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-brand-card p-10 rounded-xl border border-brand-border shadow-2xl"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2 uppercase tracking-tighter">
              Welcome Back
            </h3>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">
              Enter your credentials to access your account
            </p>
          </div>

          {/* 4. Tampilkan pesan error jika ada */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg font-semibold uppercase tracking-wide">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* 5. Hubungkan value dan onChange ke state email */}
              <Input
                label="Email Address"
                placeholder="admin@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="space-y-1">
                {/* 6. Hubungkan value dan onChange ke state password */}
                <Input
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>

            <Button
              className="w-full py-4 text-base"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In <ArrowRight size={18} />
                </div>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary font-bold uppercase tracking-widest">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-black text-accent hover:underline"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
