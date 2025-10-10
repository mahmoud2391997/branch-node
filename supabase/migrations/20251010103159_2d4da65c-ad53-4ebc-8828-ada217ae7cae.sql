-- Create departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id TEXT UNIQUE NOT NULL,
  department_name TEXT NOT NULL,
  head_name TEXT,
  head_mobile TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create employees table
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id TEXT UNIQUE NOT NULL,
  employee_name TEXT NOT NULL,
  role TEXT NOT NULL,
  mobile TEXT,
  department_id TEXT REFERENCES public.departments(department_id) ON DELETE CASCADE,
  is_head BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for prototype - will add auth later)
CREATE POLICY "Allow public read access to departments"
  ON public.departments
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to employees"
  ON public.employees
  FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_employees_department_id ON public.employees(department_id);
CREATE INDEX idx_employees_is_head ON public.employees(is_head);
CREATE INDEX idx_departments_department_id ON public.departments(department_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();