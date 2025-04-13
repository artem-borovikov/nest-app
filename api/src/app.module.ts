import { AuthModule } from '@infrastructure/auth/auth.module';
import { ConfigModule } from '@infrastructure/config/config.module';
import { mysqlConfigs } from '@infrastructure/db/configs/mysql.config';
import { AppConfigs } from '@infrastructure/helpers/appConfigs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configs: AppConfigs) => ({
        ...mysqlConfigs(configs),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [AppConfigs],
    }),
  ],
})
export class AppModule {}
