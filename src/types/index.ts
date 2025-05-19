
export type UserRole = 'admin' | 'professional' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
}

export interface Professional {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  scheduleSettings: {
    workDays: number[]; // 0-6, 0 is Sunday
    workHours: {
      start: string; // HH:MM format
      end: string; // HH:MM format
    };
  };
}

export interface Barbershop {
  id: string;
  name: string;
  cnpj: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

export type PaymentStatus = 'paid' | 'pending' | null;
export type PaymentMethod = 'credit-card' | 'cash' | 'pix' | 'other' | null;

export interface Appointment {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  clientName?: string;
  professionalName?: string;
  serviceName?: string;
}
