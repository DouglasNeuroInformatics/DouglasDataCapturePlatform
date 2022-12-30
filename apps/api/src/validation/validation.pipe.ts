import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { ObjectSchema } from 'joi';

import { ValidationException } from './validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    console.log('Transform');
    console.log('Value', value);
    console.log('Metadata', metadata);
    const result = this.schema.validate(value, {
      abortEarly: false
    });
    const errorMessages = result.error?.details.map((item) => item.message);

    if (errorMessages) {
      throw new ValidationException(errorMessages);
    }
    return result.value;
  }
}
