export default class API {
  private static host = import.meta.env.VITE_API_HOST;

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
    if (!response.ok) {
      console.error(response.status, response.statusText)
    }
  }
}