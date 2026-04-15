import React, { useState } from "react";
import { useHospitalAuth } from "@/contexts/HospitalAuthContext";
import { useHospitalData } from "@/contexts/HospitalDataContext";
import { Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const timeOptions = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
];

const DoctorAvailability: React.FC = () => {
  const { user } = useHospitalAuth();
  const { addSlot, removeSlot, getSlotsByDoctor } = useHospitalData();
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeOptions[0]);
  const { toast } = useToast();

  const mySlots = user ? getSlotsByDoctor(user.id) : [];

  const handleAdd = () => {
    if (!date || !time || !user) return;
    addSlot({ doctorId: user.id, date, time });
    toast({ title: "Slot Added", description: `${date} at ${time}` });
    setDate("");
  };

  const handleDelete = (id: string) => {
    removeSlot(id);
    toast({ title: "Slot Removed" });
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-2">Set Availability</h1>
      <p className="text-muted-foreground mb-8">Add time slots for patient bookings</p>

      <div className="bg-card border border-border rounded-2xl p-6 card-shadow mb-8">
        <h3 className="font-semibold text-card-foreground mb-4">Add New Slot</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label className="text-foreground">Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" />
          </div>
          <div className="flex-1">
            <Label className="text-foreground">Time</Label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <Button onClick={handleAdd} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white">
            <Plus className="h-4 w-4 mr-2" /> Add Slot
          </Button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-4">Your Time Slots</h3>
      {mySlots.length === 0 ? (
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No time slots added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mySlots.map((slot) => (
            <div key={slot.id} className={`bg-card border rounded-xl p-4 card-shadow flex items-center justify-between ${slot.isBooked ? "border-primary/30 bg-primary/5" : "border-border"}`}>
              <div>
                <p className="font-medium text-card-foreground">{slot.date}</p>
                <p className="text-sm text-muted-foreground">{slot.time}</p>
                {slot.isBooked && <span className="text-xs text-primary font-medium">Booked</span>}
              </div>
              {!slot.isBooked && (
                <Button size="sm" variant="ghost" onClick={() => handleDelete(slot.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAvailability;
