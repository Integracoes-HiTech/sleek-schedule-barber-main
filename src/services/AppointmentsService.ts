
import { Appointment } from "@/types";
import { AppointmentStatus, PaymentMethod, PaymentStatus } from "./appointments/types";
import { ClientAppointmentsService } from "./appointments/client-appointments";
import { ProfessionalAppointmentsService } from "./appointments/professional-appointments";
import { AdminAppointmentsService } from "./appointments/admin-appointments";
import { AppointmentOperationsService } from "./appointments/appointment-operations";

// Main service that exposes functionality from specialized services
export const AppointmentsService = {
  // Client related operations
  async getByClient(clientId: string): Promise<Appointment[]> {
    return ClientAppointmentsService.getByClientId(clientId);
  },
  
  // Professional related operations
  async getByProfessional(professionalId: string): Promise<Appointment[]> {
    return ProfessionalAppointmentsService.getByProfessionalId(professionalId);
  },
  
  // Admin related operations
  async getAll(): Promise<Appointment[]> {
    return AdminAppointmentsService.getAll();
  },
  
  async getById(id: string): Promise<Appointment | null> {
    return AdminAppointmentsService.getById(id);
  },
  
  // CRUD operations
  async create(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    return AppointmentOperationsService.create(appointment);
  },
  
  async update(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    return AppointmentOperationsService.update(id, appointment);
  },
  
  async delete(id: string): Promise<void> {
    return AppointmentOperationsService.delete(id);
  },
  
  async updateStatus(id: string, status: AppointmentStatus): Promise<void> {
    return AppointmentOperationsService.updateStatus(id, status);
  },
  
  // Payment operations
  async updatePayment(id: string, paymentStatus: PaymentStatus, paymentMethod: PaymentMethod): Promise<void> {
    return AppointmentOperationsService.updatePayment(id, paymentStatus, paymentMethod);
  }
};
