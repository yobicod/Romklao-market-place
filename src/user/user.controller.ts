import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ResponseSignUpDto, SignupDto } from './user.dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @Post('signup')
  async register(@Body() req: SignupDto): Promise<ResponseSignUpDto> {
    try {
      const signup = await this.userService.registerUser(req);
      return new ResponseSignUpDto(
        'Registration has been successful.',
        HttpStatus.CREATED,
        signup,
      );
    } catch (error) {
      throw error;
    }
  }
}
