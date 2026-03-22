export type UserRole = "worker" | "client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  neighborhood?: string;
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
  neighborhood: string;
  title: string;
  description: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  workerId: string;
  clientId: string;
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
