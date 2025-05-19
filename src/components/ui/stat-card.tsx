
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  className?: string;
}

export function StatCard({ icon: Icon, title, value, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <div className="bg-barber-gold/10 p-3 rounded-full">
            <Icon className="h-6 w-6 text-barber-gold" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
