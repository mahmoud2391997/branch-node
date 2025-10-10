import { Card } from "@/components/ui/card";
import { Phone, Users } from "lucide-react";
import { Department } from "@/hooks/useDepartments";
import { Badge } from "@/components/ui/badge";

interface DepartmentCardProps {
  department: Department;
  employeeCount?: number;
  onClick?: () => void;
}

export const DepartmentCard = ({ department, employeeCount = 0, onClick }: DepartmentCardProps) => {
  return (
    <Card
      className="p-4 hover:shadow-lg transition-all cursor-pointer bg-card border-border"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{department.department_name}</h3>
            <p className="text-sm text-muted-foreground">{department.department_id}</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {employeeCount}
          </Badge>
        </div>
        
        {department.head_name && (
          <div className="border-t border-border pt-3">
            <p className="text-sm font-medium text-foreground mb-1">Department Head</p>
            <p className="text-sm text-muted-foreground">{department.head_name}</p>
            {department.head_mobile && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <Phone className="w-3 h-3" />
                {department.head_mobile}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
