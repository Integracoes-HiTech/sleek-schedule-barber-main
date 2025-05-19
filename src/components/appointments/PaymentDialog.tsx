
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PaymentMethod, PaymentStatus } from "@/services/appointments/types";
import { useToast } from "@/hooks/use-toast";
import { AppointmentsService } from "@/services/AppointmentsService";
import { CreditCard, Banknote, CreditCardIcon, Receipt } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string;
  onSuccess?: () => void;
}

interface FormValues {
  paymentMethod: PaymentMethod;
}

export default function PaymentDialog({ open, onOpenChange, appointmentId, onSuccess }: PaymentDialogProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      paymentMethod: "cash"
    }
  });
  
  const handleSubmit = async (data: FormValues) => {
    try {
      await AppointmentsService.updatePayment(appointmentId, "paid", data.paymentMethod);
      
      toast({
        title: "Pagamento registrado",
        description: "O pagamento foi registrado com sucesso."
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao registrar pagamento",
        description: "Ocorreu um erro ao registrar o pagamento. Tente novamente.",
        variant: "destructive"
      });
      console.error("Erro ao registrar pagamento:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Pagamento</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Método de Pagamento</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <FormLabel htmlFor="credit-card" className="flex items-center cursor-pointer">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Cartão
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <FormLabel htmlFor="cash" className="flex items-center cursor-pointer">
                              <Banknote className="h-4 w-4 mr-2" />
                              Dinheiro
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pix" id="pix" />
                            <FormLabel htmlFor="pix" className="flex items-center cursor-pointer">
                              <CreditCardIcon className="h-4 w-4 mr-2" />
                              Pix
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <FormLabel htmlFor="other" className="flex items-center cursor-pointer">
                              <Receipt className="h-4 w-4 mr-2" />
                              Outro
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button type="submit">Confirmar Pagamento</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
