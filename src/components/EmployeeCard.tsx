import { Card } from "@/components/ui/card";
import { Phone, Crown } from "lucide-react";
import { Employee } from "@/hooks/useEmployees";
import { Badge } from "@/components/ui/badge";

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  return (
    <Card
      className="p-3 hover:shadow-md transition-all cursor-pointer bg-card border-border"
      onClick={onClick}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground">{employee.employee_name}</h4>
              {employee.is_head && (
                <Crown className="w-4 h-4 text-primary" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{employee.employee_id}</p>
          </div>
        </div>
        
        <div>
          <Badge variant="outline" className="text-xs">
            {employee.role}
          </Badge>
        </div>
        
        {employee.mobile && employee.mobile !== "No phone" && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="w-3 h-3" />
            {employee.mobile}
          </div>
        )}
      </div>
    </Card>
  );
};
