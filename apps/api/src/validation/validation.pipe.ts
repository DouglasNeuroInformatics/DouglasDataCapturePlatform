import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

import { ObjectSchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {

  constructor(private schema: ObjectSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    console.log('Transform')
    console.log('Value', value)
    console.log('Metadata', metadata)
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
