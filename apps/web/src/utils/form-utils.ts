import { ObjectSchema } from 'joi';

export function extractSchema(formData: FormData, schema: ObjectSchema) {
  return schema.validate(Object.fromEntries(formData));
}
