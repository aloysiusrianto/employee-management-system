export type Employee = {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
};

export const API_ENDPOINTS = {
  GET_ALL: '/api/employees',
  GET_BY_ID: '/api/employees/:id',
  CREATE: '/api/employees',
  UPDATE: '/api/employees/:id',
  DELETE: '/api/employees/:id',
} as const;
