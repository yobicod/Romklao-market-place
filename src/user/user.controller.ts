import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ResponseSignUpDto, SignupDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  async register(@Body() req: SignupDto): Promise<ResponseSignUpDto> {
    try {
      const signup = await this.userService.registerUser(req);
      return new ResponseSignUpDto(
        HttpStatus.CREATED,
        'Registered successfully',
        signup,
      );
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
        message: error.message,
      });
    }
  }
}
