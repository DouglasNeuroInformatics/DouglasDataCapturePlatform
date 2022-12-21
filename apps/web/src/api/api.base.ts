import APIException from './api.exception.js';

export default abstract class BaseAPI {
  protected static host = import.meta.env.VITE_API_HOST;

  protected static checkResponse(response: Response) {
    if (!response.ok) {
      throw new APIException(`ERROR ${response.status}: ${response.statusText}`);
    }
  }
}
