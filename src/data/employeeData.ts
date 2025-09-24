import type { Employee } from "../types/employee";

export const mockEmployees: Employee[] = [
  {
    id: 2,
    name: 'Alexa ',
    email: 'alexa@company.com',
    role: 'Product Manager',
    department: 'Product',
    joiningDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Arjun Singh ',
    email: 'arjun@gmail.com',
    role: 'UI/UX Designer',
    department: 'Design',
    joiningDate: '2025-03-10',
  },
  {
    id: 4,
    name: 'Taazaa',
    email: 'taazaa@company.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
    joiningDate: '2024-04-05',
  },
  {
    id: 1,
    name: 'Testing',
    email: 'testing@yopmail.com',
    role: 'Senior Developer',
    department: 'Engineering',
    joiningDate: '2025-08-11',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@company.com',
    role: 'DevOps Engineer',
    department: 'Engineering',
    joiningDate: '2025-01-12',
  },
  {
    id: 6,
    name: 'Waibhaw Mishra',
    email: 'waibhaw.mishra@taazaa.com',
    role: 'HR Manager',
    department: 'Human Resources',
    joiningDate: '2023-06-18',
  },
  {
    id: 7,
    name: 'Alex andy',
    email: 'alex.andy@company.com',
    role: 'Data Analyst',
    department: 'Analytics',
    joiningDate: '2025-07-22',
  },
  {
    id: 8,
    name: 'Lisa',
    email: 'lisa@company.com',
    role: 'Sales Representative',
    department: 'Sales',
    joiningDate: '2024-08-30',
  }
];

export const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Human Resources',
  'Analytics',
  'Sales'
];

export const roles = [
  'Senior Developer',
  'Product Manager',
  'UI/UX Designer',
  'DevOps Engineer',
  'HR Manager',
  'Data Analyst',
  'Sales Representative'
];