import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEmployeeStore } from "../store/employeeStore";
import { departments, roles } from "../data/employeeData";
import type { Employee } from "../types/employee";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
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
  const {
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    resetEmployees,
  } = useEmployeeStore();

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
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

  const confirmDelete = () => {
    if (employeeToDelete) deleteEmployee(employeeToDelete.id);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setSelectedEmployee(employee);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = (updatedEmployee: Employee) => {
    editEmployee(updatedEmployee);
    setIsEditModalOpen(false);
  };

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    addEmployee(newEmployee);
    setIsAddModalOpen(false);
  };

  const handleReset = () => {
    resetEmployees();
  };

  const { searchQuery, filterDepartment, filterRole, sort } = watch();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filtered = employees.filter(
    (emp) =>
      (filterDepartment ? emp.department === filterDepartment : true) &&
      (filterRole ? emp.role === filterRole : true) &&
      (debouncedSearch
        ? emp.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true)
  );

  const sorted = [...filtered].sort((a, b) => {
    const [field, order] = sort.split("-");
    let comp = 0;
    if (field === "name") comp = a.name.localeCompare(b.name);
    else if (field === "joiningDate")
      comp = new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
    return order === "asc" ? comp : -comp;
  });

  const onSubmit: SubmitHandler<FilterFormInputs> = () => {};

  return (
    <main className="px-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-purple-950">Employee Management</h2>
          <p className="text-gray-600 mt-1">Manage your team members</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsAddModalOpen(true)} className="py-2 px-4 bg-green-700 text-white rounded-md hover:bg-green-800 cursor-pointer">
            + Add Employee
          </button>
          <button onClick={handleReset} className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer">
            Reset Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-md py-4 mb-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 p-2 px-4">
            <div>
              <label className="block text-sm font-medium">Search</label>
              <input {...register("searchQuery")} placeholder="Search by name..." className="p-2 border rounded-md w-full max-w-xs" />
            </div>
            <div>
              <label className="block text-sm font-medium">Department</label>
              <select {...register("filterDepartment")} className="p-2 border rounded-md">
                <option value="">All</option>
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <select {...register("filterRole")} className="p-2 border rounded-md">
                <option value="">All</option>
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Sort By</label>
              <select {...register("sort")} className="p-2 border rounded-md">
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                <option value="joiningDate-asc">Joining Date ↑</option>
                <option value="joiningDate-desc">Joining Date ↓</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* Employee Cards */}
      {sorted.length === 0 ? (
        <div className="bg-white p-6 text-center rounded-md">No employees found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((emp) => (
            <div key={emp.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-purple-500 transition mb-4">
              <h3 className="text-xl font-semibold">{emp.name}</h3>
              <p>Email: {emp.email}</p>
              <p>Role: {emp.role}</p>
              <p>Department: {emp.department}</p>
              <p>Joining Date: {emp.joiningDate}</p>

              <div className="mt-4 flex gap-2">
                <button onClick={() => handleEdit(emp.id)}>
                  <img src={editIcon} alt="Edit" className="w-10 h-10 cursor-pointer" />
                </button>
                <button onClick={() => handleDelete(emp.id)}>
                  <img src={deleteIcon} alt="Delete" className="w-8 h-8 cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {isEditModalOpen && selectedEmployee && (
        <EditEmployee
          employee={selectedEmployee}
          onSave={handleSaveEdit}
          onClose={() => setIsEditModalOpen(false)}
          departments={departments}
          roles={roles}
          isOpen={true}
        />
      )}
      {isAddModalOpen && (
        <AddEmployeeModal
          onAdd={handleAddEmployee}
          onClose={() => setIsAddModalOpen(false)}
          departments={departments}
          roles={roles}
          isOpen={true}
        />
      )}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name || "this employee"}?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </main>
  );
};

export default EmployeesPage;