import { ResponseBuilder } from 'src/utils/response-builder';
import { IsString, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

interface IAccessToken {
  access_token: string;
}
export class ResponseLoginDto extends ResponseBuilder {
  constructor(statusCode: number, message: string, data: IAccessToken) {
    super(message, statusCode);
    this.data = data;
  }
  data: IAccessToken;
}
