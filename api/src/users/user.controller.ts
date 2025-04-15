import { IResponseMapper } from '@infrastructure/interfaces/responseMapper.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    const result = await this.userService.create(createUserDto);
    return this.responseMapper.success(result);
  }

  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    const user = await this.userService.getById(Number(id));
    return this.responseMapper.success({ users: [user] });
  }

  @Get('get')
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filters?: GetUsersDto) {
    const result = await this.userService.getAll(filters);
    return this.responseMapper.success(result);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(Number(id), updateUserDto);
    return this.responseMapper.success(user);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string) {
    const user = await this.userService.deleteById(Number(id));
    return this.responseMapper.success(user);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async deleteAll() {
    await this.userService.deleteAll();
    return this.responseMapper.success();
  }
}
