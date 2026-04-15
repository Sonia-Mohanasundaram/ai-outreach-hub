import React, { useState } from "react";
import { useHospitalData } from "@/contexts/HospitalDataContext";
import { Stethoscope, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminDoctors: React.FC = () => {
  const { doctors, addDoctor, removeDoctor } = useHospitalData();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const { toast } = useToast();

  const handleAdd = () => {
    if (!name || !email || !specialization) return;
    addDoctor({ name, email, specialization });
    toast({ title: "Doctor Added", description: name });
    setName(""); setEmail(""); setSpecialization(""); setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Doctors</h1>
          <p className="text-muted-foreground mt-1">Add, view, and remove doctors</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-primary to-emerald-500 hover:opacity-90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" /> Add Doctor
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 card-shadow mb-8">
          <h3 className="font-semibold text-card-foreground mb-4">New Doctor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-foreground">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Name" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-foreground">Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@hospital.com" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-foreground">Specialization</Label>
              <Input value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="e.g. Cardiology" className="mt-1.5" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleAdd} className="bg-gradient-to-r from-primary to-emerald-500 hover:opacity-90 text-primary-foreground">Save</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl overflow-hidden card-shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Doctor</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Specialization</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                        <Stethoscope className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-card-foreground">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{doc.email}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{doc.specialization}</td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="destructive" onClick={() => removeDoctor(doc.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctors;
