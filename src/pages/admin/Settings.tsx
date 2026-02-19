import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

const AdminSettings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = async () => {
    // API placeholder
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Admin preferences and profile</p>
      </div>

      <div className="space-y-6">
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

        <div className="bg-card border border-border rounded-xl p-6 card-shadow">
          <h2 className="font-semibold text-foreground mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="admin-name">Name</Label>
              <Input id="admin-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
