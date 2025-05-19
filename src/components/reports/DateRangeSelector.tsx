
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, addDays, subDays, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function DateRangeSelector({ dateRange, onDateRangeChange }: DateRangeSelectorProps) {
  const handleDateRangePreset = (preset: string) => {
    const today = new Date();
    
    switch (preset) {
      case "week":
        onDateRangeChange({
          from: subDays(today, 7),
          to: today,
        });
        break;
      case "month":
        onDateRangeChange({
          from: startOfMonth(today),
          to: today,
        });
        break;
      case "lastMonth":
        const lastMonthStart = startOfMonth(subDays(startOfMonth(today), 1));
        onDateRangeChange({
          from: lastMonthStart,
          to: endOfMonth(lastMonthStart),
        });
        break;
      default:
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Período</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDateRangePreset("week")}
            >
              Últimos 7 dias
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDateRangePreset("month")}
            >
              Este mês
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDateRangePreset("lastMonth")}
            >
              Mês anterior
            </Button>
          </div>
          
          <div className="border rounded-md p-2">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">De:</div>
                <div className="font-medium">
                  {dateRange.from && format(dateRange.from, "dd/MM/yyyy")}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Até:</div>
                <div className="font-medium">
                  {dateRange.to && format(dateRange.to, "dd/MM/yyyy")}
                </div>
              </div>
            </div>
          </div>

          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range) => {
              if (range) {
                // Ensure both from and to are set
                onDateRangeChange({
                  from: range.from,
                  to: range.to || range.from, // If to is not selected, use from as the end date
                });
              }
            }}
            locale={ptBR}
            className="border rounded-md pointer-events-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}
