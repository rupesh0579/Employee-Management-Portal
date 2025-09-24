import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { mockEmployees, departments, roles } from "../data/employeeData";
import type { Employee } from "../types/employee";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import EditEmployeeModal from "./EditEmployee";
import AddEmployeeModal from "./AddEmployeeModal";
import Header from "./Header";
import ReportsTab from "./ReportsTab";

interface FilterFormInputs {
  searchQuery: string;
  filterDepartment: string;
  filterRole: string;
  sort: string; // Combines sortCriteria and sortOrder (e.g., "name-asc")
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>(mockEmployees);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [activeTab, setActiveTab] = React.useState<"employees" | "reports">("employees");

  const { register, handleSubmit, watch } = useForm<FilterFormInputs>({
    defaultValues: {
      searchQuery: "",
      filterDepartment: "",
      filterRole: "",
      sort: "name-asc",
    },
  });

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setSelectedEmployee(employee);
      setIsEditModalOpen(true);
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    handleEditModalClose();
  };

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    const newId = Math.max(...employees.map((emp) => emp.id), 0) + 1;
    setEmployees([...employees, { ...newEmployee, id: newId }]);
    handleAddModalClose();
  };

  // Sorting function
  const sortEmployees = (employees: Employee[], sort: string) => {
    const [sortCriteria, sortOrder] = sort.split("-");
    return [...employees].sort((a, b) => {
      let comparison = 0;
      if (sortCriteria === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortCriteria === "joiningDate") {
        comparison = new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  // Watch form values for real-time updates
  const { searchQuery, filterDepartment, filterRole, sort } = watch();

  const filteredEmployees = employees.filter(
    (employee) =>
      (filterDepartment ? employee.department === filterDepartment : true) &&
      (filterRole ? employee.role === filterRole : true) &&
      (searchQuery
        ? employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  const sortedEmployees = sortEmployees(filteredEmployees, sort);

  const onSubmit: SubmitHandler<FilterFormInputs> = () => {
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "employees" && (
        <main className="px-12 py-2 pt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div>
              <h2 className="text-2xl font-bold text-purple-950 dark:text-white">
                Employee Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your team members and their information
              </p>
            </div>
            <button
              onClick={handleAddModalOpen}
              className="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 cursor-pointer"
            >
              + Add Employee
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-md py-4 mb-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 p-2 px-4">
                <div>
                  <label
                    htmlFor="search-employees"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Search Employees
                  </label>
                  <input
                    type="text"
                    id="search-employees"
                    {...register("searchQuery")}
                    placeholder="Search by name..."
                    className="p-2 border rounded-md w-full max-w-xs dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department Filter
                  </label>
                  <select
                    {...register("filterDepartment")}
                    className="p-2 border rounded-md w-full max-w-xs dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <select
                    {...register("filterRole")}
                    className="p-2 border rounded-md w-full max-w-xs dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <option value="">All Roles</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                    </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort By
                  </label>
                  <select
                    {...register("sort")}
                    className="p-2 border rounded-md w-full max-w-xs dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="joiningDate-asc">Joining Date (Oldest First)</option>
                    <option value="joiningDate-desc">Joining Date (Newest First)</option>
                  </select>
                </div>
              </div>
            </div>
          </form>

          <div>
            {sortedEmployees.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No employees found
                  <br />
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:bg-gray-50 hover:border-purple-500 hover:shadow-lg transition-all duration-200"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {employee.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-medium">Email:</span> {employee.email}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-medium">Role:</span> {employee.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-medium">Department:</span>{" "}
                      {employee.department}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-medium">Joining Date:</span>{" "}
                      {employee.joiningDate}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => handleEdit(employee.id)}>
                        <img
                          src={editIcon}
                          alt="Edit"
                          className="w-11 h-11 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                        />
                      </button>
                      <button onClick={() => handleDelete(employee.id)}>
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {activeTab === "reports" && (
        <ReportsTab employees={sortedEmployees} />
      )}

      {isEditModalOpen && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onSave={handleSaveEdit}
          onClose={handleEditModalClose}
          departments={departments}
          roles={roles}
        />
      )}

      {isAddModalOpen && (
        <AddEmployeeModal
          onAdd={handleAddEmployee}
          onClose={handleAddModalClose}
          departments={departments}
          roles={roles}
        />
      )}
    </div>
  );
};

export default EmployeeList;