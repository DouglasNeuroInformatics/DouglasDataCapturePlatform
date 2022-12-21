import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(reasons: string[]) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation Failed',
        reasons: reasons
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
