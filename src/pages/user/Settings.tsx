import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = async () => {
    // API placeholder
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Theme */}
        <div className="bg-card border border-border rounded-xl p-6 card-shadow">
          <h2 className="font-semibold text-foreground mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "light" ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5 text-primary" />}
              <div>
                <p className="text-sm font-medium text-foreground">{theme === "light" ? "Light" : "Dark"} Mode</p>
                <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Profile */}
        <div className="bg-card border border-border rounded-xl p-6 card-shadow">
          <h2 className="font-semibold text-foreground mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="settings-name">Name</Label>
              <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="settings-email">Email</Label>
              <Input id="settings-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
