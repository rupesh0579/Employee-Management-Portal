import { create } from "zustand";
import type { Employee } from "../types/employee";
import employeeData from "../data/employees.json";

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (newEmployee: Omit<Employee, "id">) => void;
  editEmployee: (updatedEmployee: Employee) => void;
  deleteEmployee: (id: number) => void;
  resetEmployees: () => void;
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  // Load from localStorage first, fallback to JSON
  employees: JSON.parse(localStorage.getItem("employees") || "null") ||
    employeeData.employees,

  addEmployee: (newEmployee) =>
    set((state) => {
      const newId = Math.max(...state.employees.map((e) => e.id), 0) + 1;
      const updated = [...state.employees, { ...newEmployee, id: newId }];
      localStorage.setItem("employees", JSON.stringify(updated));
      return { employees: updated };
    }),

  editEmployee: (updatedEmployee) =>
    set((state) => {
      const updated = state.employees.map((e) =>
        e.id === updatedEmployee.id ? updatedEmployee : e
      );
      localStorage.setItem("employees", JSON.stringify(updated));
      return { employees: updated };
    }),

  deleteEmployee: (id) =>
    set((state) => {
      const updated = state.employees.filter((e) => e.id !== id);
      localStorage.setItem("employees", JSON.stringify(updated));
      return { employees: updated };
    }),

  resetEmployees: () =>
    set(() => {
      localStorage.removeItem("employees");
      return { employees: employeeData.employees };
    }),
}));
