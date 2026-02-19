import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, BarChart3, Users, Mail, ArrowRight, Target, TrendingUp, Globe, Shield, Rocket, CheckCircle } from "lucide-react";

const features = [
  { icon: Zap, title: "AI Classification", desc: "Automatically classify leads by role, industry, and intent using advanced NLP models", gradient: "from-amber-500 to-orange-500" },
  { icon: Target, title: "ICP Targeting", desc: "Identify ideal customer profiles with intelligent priority scoring algorithms", gradient: "from-blue-500 to-cyan-500" },
  { icon: Users, title: "Channel Decision", desc: "AI recommends the best outreach channel and tone for maximum conversion", gradient: "from-purple-500 to-pink-500" },
  { icon: Mail, title: "Content Generation", desc: "Generate personalized outreach for LinkedIn, Email, or Call at scale", gradient: "from-emerald-500 to-teal-500" },
];

const stats = [
  { value: "10x", label: "Faster Outreach", icon: Rocket },
  { value: "95%", label: "Accuracy Rate", icon: CheckCircle },
  { value: "50+", label: "Integrations", icon: Globe },
  { value: "24/7", label: "AI Processing", icon: TrendingUp },
];

const steps = [
  { step: "01", title: "Upload Leads", desc: "Import your lead data via CSV or enter single queries", color: "from-blue-500 to-indigo-500" },
  { step: "02", title: "AI Analysis", desc: "Our agents classify, score, and prioritize your leads", color: "from-purple-500 to-pink-500" },
  { step: "03", title: "Generate Content", desc: "Get personalized outreach content for each channel", color: "from-orange-500 to-red-500" },
  { step: "04", title: "Launch Campaign", desc: "Deploy multi-channel outreach with confidence", color: "from-emerald-500 to-cyan-500" },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">AI Outreach</span>
          </div>
          <Button onClick={() => navigate("/auth")} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-pink-400/15 rounded-full blur-2xl" />

        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Outreach Platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            <span className="text-foreground">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Sales Outreach
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            AI-powered lead classification, ICP targeting, and outreach automation
          </p>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Streamline your sales pipeline with intelligent agents that classify leads, identify high-priority targets, and generate personalized outreach content at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 text-base bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25" onClick={() => navigate("/auth")}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-base">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-6 w-6 text-white/80 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful AI Agents</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Four intelligent agents work together to optimize every step of your outreach pipeline</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="group bg-card rounded-2xl p-6 card-shadow-md border border-border hover:card-shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Get started in minutes with our simple four-step process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-xl font-bold text-white">{s.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <Shield className="h-10 w-10 text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Supercharge Your Outreach?</h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">Join thousands of sales teams using AI to close more deals, faster.</p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-8 py-3 text-base font-semibold shadow-lg" onClick={() => navigate("/auth")}>
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AI Outreach System. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
