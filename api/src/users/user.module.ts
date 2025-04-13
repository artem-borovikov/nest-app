import { IResponseMapper } from '@infrastructure/interfaces/responseMapper.interface';
import { ResponseMapper } from '@infrastructure/mappers/response.mapper';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IResponseMapper,
      useClass: ResponseMapper,
    },
  ],
})
export class UserModule {}
