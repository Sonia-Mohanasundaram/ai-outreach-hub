import React from "react";
import { useHospitalAuth } from "@/contexts/HospitalAuthContext";
import { useHospitalData } from "@/contexts/HospitalDataContext";
import { CalendarCheck } from "lucide-react";

const DoctorSchedule: React.FC = () => {
  const { user } = useHospitalAuth();
  const { appointments } = useHospitalData();

  const myAppointments = appointments.filter((a) => a.doctorId === user?.id);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-2">My Schedule</h1>
      <p className="text-muted-foreground mb-8">View your booked appointments (read-only)</p>

      {myAppointments.length === 0 ? (
        <div className="bg-muted/50 rounded-2xl p-12 text-center">
          <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">No appointments yet</p>
          <p className="text-muted-foreground">Patients will appear here after booking</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Patient</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Time</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 text-sm text-card-foreground font-medium">{apt.patientName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{apt.date}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{apt.time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        apt.status === "Visited" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {apt.status}
                      </span>
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

export default DoctorSchedule;
