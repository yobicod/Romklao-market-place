import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async registerUser(req: SignupDto): Promise<boolean> {
    try {
      const hashPassword = await bcrypt.hash(req.password, 10);

      // Compare password with hash value
      // const isMatch = await bcrypt.compare(req.password, hashPassword);

      const created = await this.prisma.user.create({
        data: {
          username: req.username,
          password: hashPassword,
        },
      });

      if (created) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  public async findUser(username: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          username: username,
        },
      });

      if (user) {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
}
