import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwt: JwtService,
  ) {}
  public async signIn(username: string, pass: string): Promise<IAccessToken> {
    try {
      const user = await this.user.findUser(username);
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException({
          message: 'Password not match.',
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwt.signAsync(payload);

      return { access_token };
    } catch (error) {
      throw error;
    }
  }
}
