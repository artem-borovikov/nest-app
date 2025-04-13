import { DataSource, DataSourceOptions } from 'typeorm';
import { loadVariablesUtil } from '../../enviroment/loadVariables.util';

const env = loadVariablesUtil();

const opt: DataSourceOptions = {
  type: 'mysql',
  host: env.MYSQL_HOST,
  port: +env.MYSQL_PORT,
  username: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  migrations: ['src/infrastructure/db/migrations/*.ts'],
};

export const dataSource = new DataSource(opt);
