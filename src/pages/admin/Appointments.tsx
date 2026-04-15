import React from "react";
import { useHospitalData } from "@/contexts/HospitalDataContext";
import { CalendarCheck, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminAppointments: React.FC = () => {
  const { appointments, markVisited, deleteAppointment } = useHospitalData();
  const { toast } = useToast();

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-2">All Appointments</h1>
      <p className="text-muted-foreground mb-8">View and manage all system appointments</p>

      {appointments.length === 0 ? (
        <div className="bg-muted/50 rounded-2xl p-12 text-center">
          <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">No appointments</p>
          <p className="text-muted-foreground">Appointments will appear here when patients book</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Patient</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Doctor</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Time</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 text-sm text-card-foreground font-medium">{apt.patientName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{apt.doctorName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{apt.date}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{apt.time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        apt.status === "Visited" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {apt.status === "Booked" && (
                          <Button size="sm" onClick={() => { markVisited(apt.id); toast({ title: "Marked as Visited" }); }} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            <CheckCircle className="h-4 w-4 mr-1" /> Visited
                          </Button>
                        )}
                        <Button size="sm" variant="destructive" onClick={() => { deleteAppointment(apt.id); toast({ title: "Appointment Deleted" }); }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
