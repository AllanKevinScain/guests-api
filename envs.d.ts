declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
  }
}
