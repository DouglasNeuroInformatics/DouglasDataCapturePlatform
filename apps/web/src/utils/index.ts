import { ObjectSchema, ValidationError } from 'joi';

import type { SelectFieldOption } from '@/components/Form/SelectField';

export async function parseRequestDto<T>(request: Request, schema: ObjectSchema<T>): Promise<T | ValidationError> {
  const data = Object.fromEntries(await request.formData());
  let requestDto: T;
  try {
    requestDto = await schema.validateAsync(data, {
      abortEarly: false
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return error;
    }
    throw error;
  }
  return requestDto;
}

export function formatOptions(obj: { [key: string]: string }): SelectFieldOption[] {
  return Object.entries(obj).map(([key, value]) => ({
    label: key,
    value: value
  }));
}
