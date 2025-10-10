import { useState } from "react";
import { useDepartments } from "@/hooks/useDepartments";
import { useEmployees } from "@/hooks/useEmployees";
import { DepartmentCard } from "@/components/DepartmentCard";
import { EmployeeCard } from "@/components/EmployeeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Users, ArrowLeft, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Employee } from "@/hooks/useEmployees";

const Index = () => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  const { data: departments, isLoading: departmentsLoading } = useDepartments();
  const { data: employees, isLoading: employeesLoading } = useEmployees();

  const getEmployeeCountByDepartment = (deptId: string) => {
    return employees?.filter(emp => emp.department_id === deptId).length || 0;
  };

  const selectedDepartment = departments?.find(d => d.department_id === selectedDepartmentId);
  const departmentEmployees = employees?.filter(emp => emp.department_id === selectedDepartmentId);

  if (departmentsLoading || employeesLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Workshop Organization</h1>
              <p className="text-sm opacity-90">Transport & Logistics Staff Management</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{departments?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{employees?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Staff</p>
              </div>
            </div>
          </div>
        </div>

        {/* Department View or List */}
        {selectedDepartmentId ? (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedDepartmentId(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Departments
            </Button>

            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {selectedDepartment?.department_name}
              </h2>
              <p className="text-muted-foreground">
                {departmentEmployees?.length || 0} staff members
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentEmployees?.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onClick={() => setSelectedEmployee(employee)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">All Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments?.map((department) => (
                <DepartmentCard
                  key={department.id}
                  department={department}
                  employeeCount={getEmployeeCountByDepartment(department.department_id)}
                  onClick={() => setSelectedDepartmentId(department.department_id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Employee Detail Dialog */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEmployee?.employee_name}
              {selectedEmployee?.is_head && <Crown className="w-5 h-5 text-primary" />}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Employee ID</p>
              <p className="font-medium">{selectedEmployee?.employee_id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium">{selectedEmployee?.role}</p>
            </div>
            {selectedEmployee?.mobile && selectedEmployee.mobile !== "No phone" && (
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-medium">{selectedEmployee?.mobile}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">
                {departments?.find(d => d.department_id === selectedEmployee?.department_id)?.department_name}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
