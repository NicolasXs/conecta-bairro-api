export interface User {
  id: string;
  name: string;
  email: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  description?: string;
  contactLinks?: Array<{ label: string; value: string }>;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  workerId: string;
  workerName: string;
  category: string;
  bairro: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  workerId: string;
  clientId: string;
  clientName: string;
  score: number;
  comment?: string;
  createdAt: Date;
}

export interface MediaPhoto {
  id: string;
  workerId: string;
  url: string;
  createdAt: Date;
}
