import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { Employee } from '../types/employee';

interface AddEmployeeDrawerProps {
  onAdd: (newEmployee: Omit<Employee, 'id'>) => void;
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

const AddEmployeeDrawer: React.FC<AddEmployeeDrawerProps> = ({ onAdd, onClose, departments, roles }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      department: '',
      joiningDate: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    onAdd({
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      joiningDate: data.joiningDate,
    });
    
    onClose(); // Close the drawer after submission
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-md z-50 ">
      <div className="bg-white h-full p-6 shadow-2xl transform transition-transform duration-300 translate-x-0 border-l border-gray-200 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-950">Add New Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 focus:outline-none"
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter employee name"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter employee email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Department</label>
            <select
              {...register('department', { required: 'Department is required' })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Joining Date</label>
            <input
              type="date"
              {...register('joiningDate', { required: 'Joining date is required' })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
            />
            {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate.message}</p>}
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

export default AddEmployeeDrawer;