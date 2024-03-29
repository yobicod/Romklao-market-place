import { ResponseBuilder } from 'src/utils/response-builder';

export class LoginDto {
  username: string;
  password: string;
}

interface IAccessToken {
  access_token: string;
}
export class ResponseLoginDto extends ResponseBuilder {
  constructor(statusCode: number, message: string, data: IAccessToken) {
    super(statusCode, message);
    this.data = data;
  }
  data: IAccessToken;
}
