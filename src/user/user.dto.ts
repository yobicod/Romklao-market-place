import { ResponseBuilder } from 'src/utils/response-builder';

export class SignupDto {
  username: string;
  password: string;
}

export class ResponseSignUpDto extends ResponseBuilder {
  constructor(statusCode: number, message: string, data: boolean) {
    super(statusCode, message);
    this.data = data;
  }
  data: boolean;
}
