import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Employee {
  id: string;
  employee_id: string;
  employee_name: string;
  role: string;
  mobile: string | null;
  department_id: string | null;
  is_head: boolean;
  created_at: string;
  updated_at: string;
}

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("employee_name");
      
      if (error) throw error;
      return data as Employee[];
    },
  });
};

export const useEmployeesByDepartment = (departmentId: string) => {
  return useQuery({
    queryKey: ["employees", departmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("department_id", departmentId)
        .order("is_head", { ascending: false })
        .order("employee_name");
      
      if (error) throw error;
      return data as Employee[];
    },
    enabled: !!departmentId,
  });
};
