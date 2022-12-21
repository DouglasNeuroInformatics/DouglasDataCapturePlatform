export default abstract class BaseAPI {
  protected static host = import.meta.env.VITE_API_HOST;

  protected static checkResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`ERROR ${response.status}: ${response.statusText}`);
    }
  }
}
