import { IResponseMapper } from '@infrastructure/interfaces/responseMapper.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IResponseMapper)
    private readonly responseMapper: IResponseMapper,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return this.responseMapper.success(result);
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus() === HttpStatus.CONFLICT) {
          throw new HttpException(
            {
              success: false,
            },
            error.getStatus(),
          );
        }
        throw error;
      }
      throw new HttpException(
        {
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    try {
      const user = await this.userService.getById(Number(id));
      if (!user) {
        throw new HttpException(
          {
            success: false,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseMapper.success(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filters?: GetUsersDto) {
    try {
      const result = await this.userService.getAll(filters);
      return this.responseMapper.success(result);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(Number(id), updateUserDto);
      if (!user) {
        throw new HttpException(
          {
            success: false,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseMapper.success(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    try {
      const user = await this.userService.deleteById(Number(id));
      if (!user) {
        throw new HttpException(
          {
            success: false,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseMapper.success(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteAll() {
    try {
      await this.userService.deleteAll();
      return this.responseMapper.success();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
