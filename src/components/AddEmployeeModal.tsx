import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
// import SideDrawer from "./SideDrawer";
import type { Employee } from "../types/employee";
import SideDrawer from "../ui/SideDrawer";

interface AddEmployeeDrawerProps {
  isOpen: boolean;
  onAdd: (newEmployee: Omit<Employee, "id">) => void;
  onClose: () => void;
  departments: string[];
  roles: string[];
}

interface FormInputs {
  name: string;
  email: string;
  role: string;
  department: string;
  joiningDate: string;
}

const AddEmployeeDrawer: React.FC<AddEmployeeDrawerProps> = ({
  isOpen,
  onAdd,
  onClose,
  departments,
  roles,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    onAdd(data);
    onClose();
  };

  return (
    <SideDrawer isOpen={isOpen} onClose={onClose} title="Add New Employee">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">*Name</label>
          <input
            type="text"
            placeholder="Enter employee name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">*Email</label>
          <input
            type="email"
            placeholder="Enter employee email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">*Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">*Department</label>
          <select
            {...register("department", {
              required: "Department is required",
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">*Joining Date</label>
          <input
            type="date"
            {...register("joiningDate", {
              required: "Joining date is required",
              validate: (value) => {
                const today = new Date().toISOString().split("T")[0];
                return (
                  value <= today || "Joining date cannot be in the future"
                );
              },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
          />
          {errors.joiningDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.joiningDate.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </SideDrawer>
  );
};

export default AddEmployeeDrawer;