const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD
};