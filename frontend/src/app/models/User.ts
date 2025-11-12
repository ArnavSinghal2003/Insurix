export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // optional for frontend use
  role: 'user' | 'admin';
}
