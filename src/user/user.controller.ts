import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SignupDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  async register(@Body() req: SignupDto): Promise<boolean> {
    try {
      const signup = await this.userService.registerUser(req);
      return signup;
    } catch (error) {
      throw new InternalServerErrorException({
        error: error,
        message: error.message,
      });
    }
  }
}
