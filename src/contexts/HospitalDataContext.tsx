import React, { createContext, useContext, useState } from "react";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  image?: string;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  isBooked: boolean;
}

export type AppointmentStatus = "Booked" | "Visited";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  slotId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

interface DataContextType {
  doctors: Doctor[];
  addDoctor: (doc: Omit<Doctor, "id">) => void;
  removeDoctor: (id: string) => void;
  slots: TimeSlot[];
  addSlot: (slot: Omit<TimeSlot, "id" | "isBooked">) => void;
  removeSlot: (id: string) => void;
  getSlotsByDoctor: (doctorId: string) => TimeSlot[];
  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, "id" | "status">) => boolean;
  cancelAppointment: (id: string) => void;
  markVisited: (id: string) => void;
  deleteAppointment: (id: string) => void;
  patients: { id: string; name: string; email: string }[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const HospitalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: "d1", name: "Dr. Sarah Johnson", email: "sarah@hospital.com", specialization: "Cardiology" },
    { id: "d2", name: "Dr. Michael Chen", email: "michael@hospital.com", specialization: "Neurology" },
    { id: "d3", name: "Dr. Emily Williams", email: "emily@hospital.com", specialization: "Pediatrics" },
    { id: "d4", name: "Dr. James Brown", email: "james@hospital.com", specialization: "Orthopedics" },
  ]);

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<{ id: string; name: string; email: string }[]>([]);

  const addDoctor = (doc: Omit<Doctor, "id">) => {
    setDoctors((prev) => [...prev, { ...doc, id: crypto.randomUUID() }]);
  };

  const removeDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const addSlot = (slot: Omit<TimeSlot, "id" | "isBooked">) => {
    const exists = slots.some((s) => s.doctorId === slot.doctorId && s.date === slot.date && s.time === slot.time);
    if (exists) return;
    setSlots((prev) => [...prev, { ...slot, id: crypto.randomUUID(), isBooked: false }]);
  };

  const removeSlot = (id: string) => {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  const getSlotsByDoctor = (doctorId: string) => slots.filter((s) => s.doctorId === doctorId);

  const bookAppointment = (apt: Omit<Appointment, "id" | "status">): boolean => {
    const slot = slots.find((s) => s.id === apt.slotId);
    if (!slot || slot.isBooked) return false;

    setSlots((prev) => prev.map((s) => (s.id === apt.slotId ? { ...s, isBooked: true } : s)));
    setAppointments((prev) => [...prev, { ...apt, id: crypto.randomUUID(), status: "Booked" }]);

    if (!patients.find((p) => p.id === apt.patientId)) {
      setPatients((prev) => [...prev, { id: apt.patientId, name: apt.patientName, email: "" }]);
    }
    return true;
  };

  const cancelAppointment = (id: string) => {
    const apt = appointments.find((a) => a.id === id);
    if (apt) {
      setSlots((prev) => prev.map((s) => (s.id === apt.slotId ? { ...s, isBooked: false } : s)));
    }
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const markVisited = (id: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Visited" } : a)));
  };

  const deleteAppointment = (id: string) => {
    const apt = appointments.find((a) => a.id === id);
    if (apt) {
      setSlots((prev) => prev.map((s) => (s.id === apt.slotId ? { ...s, isBooked: false } : s)));
    }
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <DataContext.Provider
      value={{ doctors, addDoctor, removeDoctor, slots, addSlot, removeSlot, getSlotsByDoctor, appointments, bookAppointment, cancelAppointment, markVisited, deleteAppointment, patients }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useHospitalData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useHospitalData must be used within HospitalDataProvider");
  return ctx;
};
