import { registerAs } from '@nestjs/config';

export default registerAs('databaseConfig', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING,
  synchronize: false,
  autoLoadEntities: true,
}));
