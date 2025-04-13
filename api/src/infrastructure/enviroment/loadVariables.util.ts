import * as dotenv from 'dotenv';
import { AppConfigs } from '../helpers/appConfigs';

export const loadVariablesUtil = (conf = {}): AppConfigs => {
  const result = dotenv.config();
  if (!result.error) {
    conf = result.parsed;
  }

  conf = Object.assign(conf, {
    JWT_SECRET: process.env.JWT_SECRET,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    NODE_ENV: process.env.NODE_ENV,
  });

  return conf as AppConfigs;
};
