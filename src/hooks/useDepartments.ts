import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Department {
  id: string;
  department_id: string;
  department_name: string;
  head_name: string | null;
  head_mobile: string | null;
  created_at: string;
  updated_at: string;
}

export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .order("department_name");
      
      if (error) throw error;
      return data as Department[];
    },
  });
};
