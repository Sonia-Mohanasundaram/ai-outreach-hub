// API-ready service functions — replace with real fetch calls when backend is available

const API_BASE = "/api";

export const authAPI = {
  login: async (email: string, password: string, role: string) => {
    // POST /api/auth/login
    return { token: "mock-jwt", user: { email, role } };
  },
  register: async (name: string, email: string, password: string, role: string) => {
    // POST /api/auth/register
    return { token: "mock-jwt", user: { name, email, role } };
  },
};

export const doctorsAPI = {
  getAll: async () => {
    // GET /api/doctors
    return [];
  },
  create: async (doctor: any) => {
    // POST /api/doctors
    return doctor;
  },
  delete: async (id: string) => {
    // DELETE /api/doctors/:id
    return { success: true };
  },
};

export const availabilityAPI = {
  create: async (slot: any) => {
    // POST /api/availability
    return slot;
  },
  getByDoctor: async (doctorId: string) => {
    // GET /api/availability/:doctorId
    return [];
  },
  delete: async (id: string) => {
    // DELETE /api/availability/:id
    return { success: true };
  },
};

export const appointmentsAPI = {
  getAll: async () => {
    // GET /api/appointments
    return [];
  },
  create: async (appointment: any) => {
    // POST /api/appointments
    return appointment;
  },
  delete: async (id: string) => {
    // DELETE /api/appointments/:id
    return { success: true };
  },
  markVisited: async (id: string) => {
    // PUT /api/appointments/:id/visit
    return { success: true };
  },
};
