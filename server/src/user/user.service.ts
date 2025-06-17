import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];
  private nextId = 1;

  create(userData: Omit<User, 'id'>): User {
    const user: User = {
      id: this.nextId++,
      ...userData,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
} 