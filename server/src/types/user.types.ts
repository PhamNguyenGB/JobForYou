export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserUpdateDto {
  name?: string;
  email?: string;
  phone?: string;
  passOld?: string;
  passNew?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreateDto {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
