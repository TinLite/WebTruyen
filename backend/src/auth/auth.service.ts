import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(this.constructor.name);

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(username);
    this.logger.debug(`Finding user by email: ${username} result ${user}`);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw null;
    }
    return user;
  }
}
