declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    SUPERTOKENS_URI: string;
    SUPERTOKENS_API_KEY: string;
    WEBSITE_DOMAIN: string;
    DATABASE_URL: string;
    API_DOMAIN: string;
  }
}
