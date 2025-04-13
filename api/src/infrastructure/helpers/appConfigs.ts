import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class AppConfigs {
  constructor(private readonly config: ConfigService) {}

  get JWT_SECRET(): string {
    return this.config.get('JWT_SECRET');
  }

  get MYSQL_HOST(): string {
    return this.config.get('MYSQL_HOST');
  }

  get MYSQL_PORT(): string {
    return this.config.get('MYSQL_PORT');
  }

  get MYSQL_USER(): string {
    return this.config.get('MYSQL_USER');
  }

  get MYSQL_PASSWORD(): string {
    return this.config.get('MYSQL_PASSWORD');
  }

  get MYSQL_DATABASE(): string {
    return this.config.get('MYSQL_DATABASE');
  }
}
