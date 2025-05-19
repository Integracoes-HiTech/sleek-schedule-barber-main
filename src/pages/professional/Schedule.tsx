
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { PageHeader } from "@/components/ui/page-header";
import PaymentDialog from "@/components/appointments/PaymentDialog";
import { useAppointments } from "@/hooks/useAppointments";
import { CalendarView } from "@/components/professional/schedule/CalendarView";
import { NextAppointments } from "@/components/professional/schedule/NextAppointments";
import { PendingRequests } from "@/components/professional/schedule/PendingRequests";
import { StatisticsCards } from "@/components/professional/schedule/StatisticsCards";

export default function ProfessionalSchedule() {
  const {
    appointments,
    selectedDate,
    setSelectedDate,
    pendingAppointments,
    todayAppointments,
    showPaymentDialog,
    setShowPaymentDialog,
    selectedAppointmentId,
    handleApproveAppointment,
    handleRejectAppointment,
    handlePayment,
    handlePaymentSuccess
  } = useAppointments();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="professional" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <PageHeader 
            title="Minha Agenda" 
            description="Gerencie seus agendamentos e atendimentos"
          />
          
          {/* Status Cards */}
          <StatisticsCards 
            appointments={appointments}
            todayAppointments={todayAppointments}
            pendingAppointments={pendingAppointments}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar and Appointments View */}
            <CalendarView 
              appointments={appointments}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleApproveAppointment={handleApproveAppointment}
              handleRejectAppointment={handleRejectAppointment}
              handlePayment={handlePayment}
            />
            
            <div className="space-y-6">
              {/* Next appointments */}
              <NextAppointments 
                appointments={todayAppointments}
                handlePayment={handlePayment}
              />
              
              {/* Pending Approval */}
              <PendingRequests 
                pendingAppointments={pendingAppointments}
                handleApproveAppointment={handleApproveAppointment}
                handleRejectAppointment={handleRejectAppointment}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        appointmentId={selectedAppointmentId}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
