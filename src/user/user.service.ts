import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async registerUser(req: any): Promise<boolean> {
    try {
      const created = await this.prisma.user.create({
        data: {
          username: req.username,
          password: req.password,
        },
      });

      if (created) {
        console.log('ss');
        return true;
      }
      console.log('xx');
    } catch (error) {
      throw error;
    }
  }
}
