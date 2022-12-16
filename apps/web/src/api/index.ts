class APIError extends Error {
  constructor(public status: number, public statusText: string) {
    super(`${status}: ${statusText}`);
    this.name = 'APIError';
  }
}

export default class API {
  private static host = import.meta.env.VITE_API_HOST;

  private static checkResponse(response: Response) {
    if (!response.ok) {
      throw new APIError(response.status, response.statusText);
    }
  }

  static async login() {
    const response = await fetch(`${this.host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'Admin123'
      })
    });
    this.checkResponse(response)
    if (!response.ok) {
      console.error(response.status, response.statusText)
    }
  }
}