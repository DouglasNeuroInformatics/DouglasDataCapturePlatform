export default class AuthToken extends String {
  parse() {
    const [header, payload, signature] = this.split('.');
    return {
      header: JSON.parse(window.atob(header)) as unknown,
      payload: JSON.parse(window.atob(payload)) as unknown,
      signature: JSON.parse(window.atob(signature)) as unknown
    };
  }

  extractFromPayload(key: string) {
    const { payload } = this.parse();
    console.log(payload);
  }
}
