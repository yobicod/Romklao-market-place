import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { LoginDto, ResponseLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Public()
  @Post('login')
  async signIn(@Body() req: LoginDto): Promise<any> {
    try {
      const access_token = await this.auth.signIn(req.username, req.password);

      return new ResponseLoginDto(
        HttpStatus.CREATED,
        'Login successfully.',
        access_token,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
