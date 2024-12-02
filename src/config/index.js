import dotenv from "dotenv";

dotenv.config();

const PAGINATION_LIMIT = 10;
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "dev";
const MERCADOPAGO = process.env.MERCADOPAGO || "test";
const URL_FRONT = process.env.URL_FRONT
const URL_BACK = process.env.URL_BACK

const EMAIL = {
  HOST: process.env.EMAIL_SMPT_HOST,
  PORT: process.env.EMAIL_SMPT_PORT,
  SERVICE: process.env.EMAIL_SMPT_SERVICE,
  MAIL: process.env.EMAIL_SMPT_MAIL,
  APP_PASS: process.env.EMAIL_SMPT_APP_PASS,
};

const FIREBASE = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CLIENT_CERT,
  universe_domain: "googleapis.com",
};

export { EMAIL, FIREBASE, MODE, PAGINATION_LIMIT, PORT, MERCADOPAGO, URL_FRONT, URL_BACK };
