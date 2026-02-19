import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, User, Shield, ArrowLeft } from "lucide-react";

type AuthMode = "select" | "user-login" | "user-signup" | "admin-login" | "admin-signup";

const RoleSelection: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("select");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "user" | "admin") => {
    if (!email || !password) return;
    login(email, password, role);
    navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const handleSignup = (role: "user" | "admin") => {
    if (!name || !email || !password) return;
    signup(name, email, password, role);
    navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
  };

  const resetForm = () => { setEmail(""); setPassword(""); setName(""); };

  if (mode === "select") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <button onClick={() => navigate("/")} className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">AI Outreach System</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          <div
            onClick={() => { resetForm(); setMode("user-login"); }}
            className="bg-card border border-border rounded-xl p-8 card-shadow-md hover:card-shadow-lg cursor-pointer transition-all hover:border-primary/30 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">User Login</h2>
            <p className="text-sm text-muted-foreground">Access lead generation, outreach tools, and your pipeline dashboard</p>
          </div>
          <div
            onClick={() => { resetForm(); setMode("admin-login"); }}
            className="bg-card border border-border rounded-xl p-8 card-shadow-md hover:card-shadow-lg cursor-pointer transition-all hover:border-primary/30 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Admin Login</h2>
            <p className="text-sm text-muted-foreground">Manage users, monitor activity, and view system analytics</p>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = mode.startsWith("admin");
  const isSignup = mode.endsWith("signup");
  const role = isAdmin ? "admin" : "user";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <button onClick={() => setMode("select")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to selection
        </button>

        <div className="bg-card border border-border rounded-xl p-8 card-shadow-md animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            {isAdmin ? <Shield className="h-5 w-5 text-primary" /> : <User className="h-5 w-5 text-primary" />}
            <h2 className="text-xl font-semibold text-foreground">
              {isAdmin ? "Admin" : "User"} {isSignup ? "Sign Up" : "Login"}
            </h2>
          </div>

          <div className="space-y-4">
            {isSignup && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="mt-1" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
            </div>

            <Button className="w-full" onClick={() => isSignup ? handleSignup(role) : handleLogin(role)}>
              {isSignup ? "Sign Up" : "Login"}
            </Button>

            <Button variant="outline" className="w-full" onClick={() => handleLogin(role)}>
              Continue with Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {isSignup ? (
                <span>Already have an account?{" "}
                  <button onClick={() => setMode(isAdmin ? "admin-login" : "user-login")} className="text-primary hover:underline font-medium">Login</button>
                </span>
              ) : (
                <span>Don't have an account?{" "}
                  <button onClick={() => setMode(isAdmin ? "admin-signup" : "user-signup")} className="text-primary hover:underline font-medium">Sign Up</button>
                </span>
              )}
            </div>

            {!isAdmin && mode === "user-login" && (
              <div className="text-center text-sm">
                <button onClick={() => { resetForm(); setMode("admin-login"); }} className="text-muted-foreground hover:text-primary transition-colors">
                  Are you an admin? Login here →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
