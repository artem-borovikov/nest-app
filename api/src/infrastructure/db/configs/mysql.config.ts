import { AppConfigs } from '@infrastructure/helpers/appConfigs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const mysqlConfigs = (configs: AppConfigs): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: configs.MYSQL_HOST,
    port: +configs.MYSQL_PORT,
    username: configs.MYSQL_USER,
    password: configs.MYSQL_PASSWORD,
    database: configs.MYSQL_DATABASE,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [process.cwd() + '/src/**/*.entities.{ts,js}'],
    migrations: [process.cwd() + 'src/infrastructure/db/migrations/*.ts'],
    charset: 'utf8mb4',
    extra: {
      connectionLimit: 10,
    },
  };
};
