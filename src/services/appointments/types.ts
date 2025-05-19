
import { Appointment } from "@/types";

// Database mapping types
export type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
export type PaymentMethod = 'credit-card' | 'cash' | 'pix' | 'other' | null;
export type PaymentStatus = 'paid' | 'pending' | null;

export interface AppointmentDbData {
  id: string;
  client_id: string;
  professional_id: string;
  service_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  payment_status?: PaymentStatus | null;
  payment_method?: PaymentMethod | null;
  created_at?: string;
  updated_at?: string;
  
  // Joined data - making these optional to handle different join cases
  profiles?: { id: string; name: string } | null;
  professionals?: { name: string } | null;
  services?: { name: string } | null;
  clients?: { id: string; name: string } | null;
}

export interface AppointmentCreateInput {
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
}

export interface AppointmentUpdateInput {
  clientId?: string;
  professionalId?: string;
  serviceId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  status?: AppointmentStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
}

// Helper function to safely access properties that might not exist
const safeGet = <T>(obj: any, prop: string, defaultValue: T): T => {
  return obj && obj[prop] !== undefined ? obj[prop] : defaultValue;
};

// Map from database format to application format with safer handling of optional fields
export function mapAppointmentFromDb(dbAppointment: any): Appointment {
  return {
    id: dbAppointment.id,
    clientId: dbAppointment.client_id,
    professionalId: dbAppointment.professional_id,
    serviceId: dbAppointment.service_id,
    date: dbAppointment.date,
    startTime: dbAppointment.start_time,
    endTime: dbAppointment.end_time,
    status: dbAppointment.status as AppointmentStatus,
    paymentStatus: safeGet<PaymentStatus>(dbAppointment, 'payment_status', null),
    paymentMethod: safeGet<PaymentMethod>(dbAppointment, 'payment_method', null),
    // Add names if available from joins
    clientName: dbAppointment.profiles?.name || dbAppointment.clients?.name,
    professionalName: dbAppointment.professionals?.name,
    serviceName: dbAppointment.services?.name
  };
}

// Map from application format to database format
export function mapAppointmentToDb(appointment: AppointmentCreateInput): any {
  return {
    client_id: appointment.clientId,
    professional_id: appointment.professionalId,
    service_id: appointment.serviceId,
    date: appointment.date,
    start_time: appointment.startTime,
    end_time: appointment.endTime,
    status: appointment.status,
    payment_status: appointment.paymentStatus || null,
    payment_method: appointment.paymentMethod || null
  };
}

// Map update input to database format
export function mapAppointmentUpdateToDb(appointment: AppointmentUpdateInput): any {
  const result: any = {};
  
  if (appointment.clientId !== undefined) result.client_id = appointment.clientId;
  if (appointment.professionalId !== undefined) result.professional_id = appointment.professionalId;
  if (appointment.serviceId !== undefined) result.service_id = appointment.serviceId;
  if (appointment.date !== undefined) result.date = appointment.date;
  if (appointment.startTime !== undefined) result.start_time = appointment.startTime;
  if (appointment.endTime !== undefined) result.end_time = appointment.endTime;
  if (appointment.status !== undefined) result.status = appointment.status;
  if (appointment.paymentStatus !== undefined) result.payment_status = appointment.paymentStatus;
  if (appointment.paymentMethod !== undefined) result.payment_method = appointment.paymentMethod;
  
  return result;
}
