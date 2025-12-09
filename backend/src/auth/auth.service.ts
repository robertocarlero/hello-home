import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersMockService } from './users-mock.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersMockService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(email);
      if (user && user.password === pass) {
        const { password, id, ...result } = user;
        return { ...result, userId: id };
      }
      return null;
    } catch (error) {
      this.logger.error('Error during user validation:', error);
      throw new InternalServerErrorException('Failed to validate user');
    }
  }

  async login(user: any) {
    try {
      const payload = {
        email: user.email,
        sub: user.userId || user.id,
        role: user.role,
        name: user.name,
        userId: user.userId || user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user,
      };
    } catch (error) {
      this.logger.error('Error during login:', error);
      throw new InternalServerErrorException('Failed to generate access token');
    }
  }
}
