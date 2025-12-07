import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersMockService } from './users-mock.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersMockService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
