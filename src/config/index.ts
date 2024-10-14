import dotenv from "dotenv";

dotenv.config();

const PAGINATION_LIMIT = 10;
const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE || "dev";

const EMAIL = {
  HOST: process.env.EMAIL_SMPT_HOST,
  PORT: process.env.EMAIL_SMPT_PORT,
  SERVICE: process.env.EMAIL_SMPT_SERVICE,
  MAIL: process.env.EMAIL_SMPT_MAIL,
  APP_PASS: process.env.EMAIL_SMPT_APP_PASS,
};

export { EMAIL, MODE, PAGINATION_LIMIT, PORT };
