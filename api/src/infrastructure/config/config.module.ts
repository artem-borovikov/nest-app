import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { loadVariablesUtil } from '../enviroment/loadVariables.util';
import { variablesSchema } from '../enviroment/variables.schema';
import { AppConfigs } from '../helpers/appConfigs';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [loadVariablesUtil],
      validationSchema: Object.assign(variablesSchema),
    }),
  ],
  providers: [AppConfigs],
  exports: [AppConfigs],
})
export class ConfigModule {}
