export interface Dependency {
  id: number;
  name: string;
  address: string;
  telephone: string;
  email: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface DependencyResponse {
  data: Dependency;
  message: string;
}
