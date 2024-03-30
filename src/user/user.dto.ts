import { ResponseBuilder } from 'src/utils/response-builder';

export class SignupDto {
  username: string;
  password: string;
}

export class ResponseSignUpDto extends ResponseBuilder {
  constructor(message: string, statusCode: number, data: boolean) {
    super(message, statusCode);
    this.data = data;
  }
  data: boolean;
}
