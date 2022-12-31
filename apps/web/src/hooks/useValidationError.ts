import { ValidationError } from 'joi';
import { useActionData } from 'react-router-dom';

export default function useValidationError(): ValidationError | null {
  const actionData = useActionData();
  if (actionData instanceof ValidationError) {
    return actionData
  }
  return null;
}
