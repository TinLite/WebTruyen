import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw null;
    }
    return { id: user._id, role: user.role };
  }
  async changPass(userId, oldPass: string, newPass: string) {
    const hashedPass = await bcrypt.hash(newPass, 10);
    return await this.usersService.upadatePass(userId, hashedPass);
  }
}
