interface Config {
  port: number
}

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is undefined!`)
  }
  return value
}

export function loadConfig(): Config {
  return {
    port: parseInt(getEnvVar('PORT'))
  }
}