
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { Clock, DollarSign } from "lucide-react";

interface AppointmentItem {
  id: string;
  client: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  paymentStatus: string;
}

interface NextAppointmentsProps {
  appointments: AppointmentItem[];
  handlePayment: (id: string) => void;
}

export const NextAppointments = ({ appointments, handlePayment }: NextAppointmentsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" /> Próximos Atendimentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div 
                key={apt.id} 
                className="flex items-center p-3 border rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium">{apt.client}</div>
                  <div className="text-sm text-gray-500">
                    {apt.service} · {apt.startTime}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="ml-2">{format(parseISO(`${apt.date}T${apt.startTime}`), "HH:mm")}</Badge>
                  {apt.paymentStatus !== "paid" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-50"
                      onClick={() => handlePayment(apt.id)}
                    >
                      <DollarSign className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed">
            <Clock className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2">Sem atendimentos hoje</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
