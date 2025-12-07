import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersMockService {
  private readonly users = [
    {
      id: 1,
      email: 'test@example.com',
      password: 'password123', // plaintext for now
      name: 'Usuario Demo',
      role: 'customer',
    },
  ];

  async findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
