import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  accessExpires: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN,
  refreshExpires: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
}));
