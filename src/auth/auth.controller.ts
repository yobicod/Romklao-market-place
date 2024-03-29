import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, ResponseLoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
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
}
