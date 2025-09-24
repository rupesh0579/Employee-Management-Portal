import * as React from "react";
import type { Employee } from "../types/employee";

interface EditEmployeeDrawerProps {
  employee: Employee;
  onSave: (updatedEmployee: Employee) => void;
  onClose: () => void;
  departments: string[];
  roles: string[];
}

const EditEmployeeDrawer: React.FC<EditEmployeeDrawerProps> = ({
  employee,
  onSave,
  onClose,
  departments,
  roles,
}) => {
  const [formData, setFormData] = React.useState<Employee>({
    ...employee,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose(); // Close the drawer after submission
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-md z-50">
      <div className="bg-white h-full p-6 shadow-2xl transform transition-transform duration-300 translate-x-0 border-l border-gray-200 rounded-xl ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 focus:outline-none"
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-800"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-800"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-800"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleFormChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-800"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleFormChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-800"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-purple-800 text-white rounded hover:bg-purple-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeDrawer;