import * as React from "react";
import { useEmployeeStore } from "../store/employeeStore";
import { Reports as ReportsComponent } from "../components/Reports";

const ReportsPage: React.FC = () => {
  const { employees } = useEmployeeStore();

  return (
    <div className="px-12">
      <ReportsComponent employees={employees} />
    </div>
  );
};

export default ReportsPage;
