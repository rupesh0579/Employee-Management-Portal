import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { departments, roles } from "../data/employeeData";
import type { Employee } from "../types/employee";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import employeeData from "../data/employees.json";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EditEmployee from "../components/EditEmployee";
import DeleteConfirmModal from "../ui/DeleteConfirmModal";
import { useDebounce } from "../hooks/useDebounce";

interface FilterFormInputs {
  searchQuery: string;
  filterDepartment: string;
  filterRole: string;
  sort: string;
}

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>(
    employeeData.employees
  );
  const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Employee | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [employeeToDelete, setEmployeeToDelete] =
    React.useState<Employee | null>(null);

  const { register, handleSubmit, watch } = useForm<FilterFormInputs>({
    defaultValues: {
      searchQuery: "",
      filterDepartment: "",
      filterRole: "",
      sort: "name-asc",
    },
  });

  const handleDelete = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setEmployeeToDelete(employee);
      setIsDeleteModalOpen(true);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };
  const confirmDelete = () => {
    if (employeeToDelete) {
      setEmployees(employees.filter((emp) => emp.id !== employeeToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
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

  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => setIsAddModalOpen(false);

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

  const sortEmployees = (employees: Employee[], sort: string) => {
    const [sortCriteria, sortOrder] = sort.split("-");
    return [...employees].sort((a, b) => {
      let comparison = 0;
      if (sortCriteria === "name") comparison = a.name.localeCompare(b.name);
      else if (sortCriteria === "joiningDate")
        comparison =
          new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const { searchQuery, filterDepartment, filterRole, sort } = watch();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredEmployees = employees.filter(
    (employee) =>
      (filterDepartment ? employee.department === filterDepartment : true) &&
      (filterRole ? employee.role === filterRole : true) &&
      (debouncedSearch
        ? employee.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true)
  );
  //   console.log("filteredEmployees:", filteredEmployees);
  //   console.log("role:", filterRole);

  const sortedEmployees = sortEmployees(filteredEmployees, sort);

  const onSubmit: SubmitHandler<FilterFormInputs> = () => {};

  return (
    <main className="px-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-purple-950 dark:text-white">
            Employee Dashboard
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

      {/* Filters */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-md py-4 mb-6 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 p-2 px-4">
            <div>
              <label className="block text-sm font-medium">
                Search Employees
              </label>
              <input
                type="text"
                {...register("searchQuery")}
                placeholder="Search by name..."
                className="p-2 border rounded-md w-full max-w-xs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Department</label>
              <select
                {...register("filterDepartment")}
                className="p-2 border rounded-md"
              >
                <option value="">All</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                {...register("filterRole")}
                className="p-2 border rounded-md"
              >
                <option value="">All</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Sort By</label>
              <select {...register("sort")} className="p-2 border rounded-md">
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="joiningDate-asc">
                  Joining Date (Oldest First)
                </option>
                <option value="joiningDate-desc">
                  Joining Date (Newest First)
                </option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* Employee Cards */}
      <div>
        {sortedEmployees.length === 0 ? (
          <div className="bg-white p-6 text-center rounded-md">
            <p>No employees found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEmployees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:bg-gray-50 hover:border-purple-500 hover:shadow-lg transition-all duration-200 mb-4"
              >
                <h3 className="text-xl font-semibold">{employee.name}</h3>
                <p>Email: {employee.email}</p>
                <p>Role: {employee.role}</p>
                <p>Department: {employee.department}</p>
                <p>Joining Date: {employee.joiningDate}</p>

                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleEdit(employee.id)}>
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="w-10 h-10 cursor-pointer"
                    />
                  </button>
                  <button onClick={() => handleDelete(employee.id)}>
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="w-8 h-8 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {isEditModalOpen && selectedEmployee && (
        <EditEmployee
          employee={selectedEmployee}
          onSave={handleSaveEdit}
          onClose={handleEditModalClose}
          departments={departments}
          roles={roles}
          isOpen={true}
        />
      )}
      {isAddModalOpen && (
        <AddEmployeeModal
          onAdd={handleAddEmployee}
          onClose={handleAddModalClose}
          departments={departments}
          roles={roles}
          isOpen={true}
        />
      )}
     
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete ${
          employeeToDelete?.name || "this employee"
        }?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </main>
  );
};

export default EmployeesPage;