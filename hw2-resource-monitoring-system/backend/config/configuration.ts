import * as dotenv from "dotenv";
dotenv.config({ path: `.env` });

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_CONTAINER_PORT,
    host: process.env.POSTGRES_HOST,
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      expireTime: process.env.JWT_EXPIRE_TIME,
      refreshExpireTime: process.env.JWT_REFRESH_EXPIRE_TIME,
    },
  },
});
