export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  gender?: string;
  birthday?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  is_active?: boolean;
  avatar_url?: string;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}
