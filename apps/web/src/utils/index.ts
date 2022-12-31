import { ObjectSchema, ValidationError } from 'joi';

export async function parseRequestDto<T>(request: Request, schema: ObjectSchema<T>): Promise<T | ValidationError> {
  const data = Object.fromEntries(await request.formData());
  let requestDto: T;
  try {
    requestDto = await schema.validateAsync(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      return error;
    }
    throw error;
  }
  return requestDto;
}
