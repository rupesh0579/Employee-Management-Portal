import * as React from "react";
import ReportsTab from "../components/ReportsTab";
import employeeData from "../data/employees.json";


const ReportsPage: React.FC = () => {
  return (
      <ReportsTab employees={employeeData.employees} />
  );
};

export default ReportsPage;
