import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, User, Shield, ArrowLeft } from "lucide-react";

type AuthMode = "user-login" | "user-signup" | "admin-login" | "admin-signup";

const RoleSelection: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("user-login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const isAdmin = mode.startsWith("admin");
  const isSignup = mode.endsWith("signup");
  const role = isAdmin ? "admin" : "user";

  const handleLogin = () => {
    if (!email || !password) return;
    login(email, password, role);
    navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const handleSignup = () => {
    if (!name || !email || !password) return;
    signup(name, email, password, role);
    navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const resetForm = () => { setEmail(""); setPassword(""); setName(""); };

  const switchRole = (newRole: "user" | "admin") => {
    resetForm();
    setMode(newRole === "user" ? "user-login" : "admin-login");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">
      {/* Colorful animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-transparent to-amber-500/20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-400/20 rounded-full blur-3xl" />

      <button onClick={() => navigate("/")} className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm z-10">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">AI Outreach System</h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-6">
          <button
            onClick={() => switchRole("user")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
              !isAdmin
                ? "bg-white text-gray-900 shadow-lg"
                : "text-white/70 hover:text-white"
            }`}
          >
            <User className="h-4 w-4" />
            User
          </button>
          <button
            onClick={() => switchRole("admin")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
              isAdmin
                ? "bg-white text-gray-900 shadow-lg"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Shield className="h-4 w-4" />
            Admin
          </button>
        </div>

        {/* Auth Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl animate-fade-in">
          <h2 className="text-xl font-semibold text-white mb-6">
            {isAdmin ? "Admin" : "User"} {isSignup ? "Sign Up" : "Login"}
          </h2>

          <div className="space-y-4">
            {isSignup && (
              <div>
                <Label htmlFor="name" className="text-white/90">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50" />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50" />
            </div>
            <div>
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50" />
            </div>

            <Button className="w-full bg-white text-gray-900 hover:bg-white/90 font-semibold" onClick={() => isSignup ? handleSignup() : handleLogin()}>
              {isSignup ? "Sign Up" : "Login"}
            </Button>

            <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={handleLogin}>
              Continue with Google
            </Button>

            <div className="text-center text-sm text-white/70">
              {isSignup ? (
                <span>Already have an account?{" "}
                  <button onClick={() => setMode(isAdmin ? "admin-login" : "user-login")} className="text-white hover:underline font-medium">Login</button>
                </span>
              ) : (
                <span>Don't have an account?{" "}
                  <button onClick={() => setMode(isAdmin ? "admin-signup" : "user-signup")} className="text-white hover:underline font-medium">Sign Up</button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
