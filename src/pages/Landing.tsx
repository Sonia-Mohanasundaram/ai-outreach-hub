import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, Users, Mail } from "lucide-react";

const features = [
  { icon: Zap, title: "AI Classification", desc: "Automatically classify leads by role, industry, and intent" },
  { icon: BarChart3, title: "ICP Targeting", desc: "Identify ideal customer profiles with priority scoring" },
  { icon: Users, title: "Channel Decision", desc: "AI recommends the best outreach channel and tone" },
  { icon: Mail, title: "Content Generation", desc: "Generate personalized outreach for LinkedIn, Email, or Call" },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">AI Outreach System</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Outreach Platform
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-4">
            AI Outreach System
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-3 max-w-2xl mx-auto">
            AI-powered lead classification, ICP targeting, and outreach automation
          </p>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Streamline your sales pipeline with intelligent agents that classify leads, identify high-priority targets, and generate personalized outreach content at scale.
          </p>
          <Button size="lg" className="px-8 py-3 text-base" onClick={() => navigate("/auth")}>
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full mt-20 animate-fade-in">
          {features.map((f) => (
            <div key={f.title} className="bg-card rounded-xl p-6 card-shadow-md border border-border hover:card-shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AI Outreach System. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
