import * as React from "react";
import { Reports } from "./Reports";
import type { Employee } from "../types/employee";

interface ReportsTabProps {
  employees: Employee[];
}

const ReportsTab: React.FC<ReportsTabProps> = ({ employees }) => {
  return (
    <main className="px-12 py-6">
      <Reports employees={employees} />
    </main>
  );
};

export default ReportsTab;