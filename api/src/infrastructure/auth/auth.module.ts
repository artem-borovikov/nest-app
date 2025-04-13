import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfigs } from '../helpers/appConfigs';
import { GlobalAuthProvider } from './providers/global-auth.provider';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: AppConfigs) => ({
        secret: config.JWT_SECRET,
      }),
      inject: [AppConfigs],
    }),
  ],
  providers: [JwtStrategy, GlobalAuthProvider],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
