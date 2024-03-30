import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async registerUser(req: SignupDto): Promise<boolean> {
    try {
      const hashPassword = await bcrypt.hash(req.password, 10);

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
      throw new InternalServerErrorException({
        message: 'Internal server error',
        error: error,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async findUser(username: string): Promise<IUser> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
