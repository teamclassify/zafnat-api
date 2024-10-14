require("dotenv").config();

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

module.exports = {
  PAGINATION_LIMIT,
  PORT,
  MODE,
  EMAIL,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
};
