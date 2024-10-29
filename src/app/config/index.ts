import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_slat_rounds: process.env.BCRYPT_SLAT_BOUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  payment_url: process.env.PAYMENT_URL,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,
  client_url: process.env.CLIENT_URL,
  live_url: process.env.LIVE_URL,
  client_live_url_service_page: process.env.CLIENT_LIVE_URL_SERVICE_PAGE,
};
