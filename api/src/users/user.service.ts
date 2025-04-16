import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_ERRORS } from './constants/user.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async checkExistingRoles(roles: string[]): Promise<void> {
    const existingRoles = await this.userRepository
      .createQueryBuilder('user')
      .select('DISTINCT user.role')
      .where('user.role IN (:...roles)', { roles })
      .getRawMany();

    if (existingRoles.length !== roles.length) {
      throw new HttpException(
        {
          success: false,
          result: {
            error: USER_ERRORS.ROLES_NOT_FOUND,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async checkExistingNames(names: string[]): Promise<void> {
    const existingNames = await this.userRepository
      .createQueryBuilder('user')
      .select('DISTINCT user.full_name')
      .where('user.full_name IN (:...names)', { names })
      .getRawMany();

    if (existingNames.length !== names.length) {
      throw new HttpException(
        USER_ERRORS.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async checkExistingName(userName: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { full_name: userName },
    });

    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким именем уже существует!',
      );
    }
  }

  public async create(createUserDto: CreateUserDto): Promise<{ id: number }> {
    await this.checkExistingName(createUserDto.full_name);
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return { id: savedUser.id };
  }

  public async getById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async getAll(
    filters?: GetUsersDto,
  ): Promise<{ users: User[]; total: number }> {
    if (filters) {
      if (filters.role?.length) {
        await this.checkExistingRoles(filters.role);
      }
      if (filters.full_name?.length) {
        await this.checkExistingNames(filters.full_name);
      }
    }

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (filters) {
      if (filters.full_name?.length) {
        queryBuilder.andWhere(
          new Array(filters.full_name.length)
            .fill('user.full_name LIKE :full_name_${index}')
            .map((template, index) =>
              template.replace('${index}', String(index)),
            )
            .join(' OR '),
          filters.full_name.reduce(
            (params, name, index) => ({
              ...params,
              [`full_name_${index}`]: `%${name}%`,
            }),
            {},
          ),
        );
      }
      if (filters.role?.length) {
        queryBuilder.andWhere('user.role IN (:...roles)', {
          roles: filters.role,
        });
      }
      if (filters.efficiency?.length) {
        queryBuilder.andWhere('user.efficiency IN (:...efficiencies)', {
          efficiencies: filters.efficiency,
        });
      }
    }

    const [users, total] = await queryBuilder
      .skip(filters?.offset || 0) // FIXME magic
      .take(filters?.limit || 10)
      .getManyAndCount();

    return { users, total };
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    if (updateUserDto.full_name) {
      await this.checkExistingName(updateUserDto.full_name);
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(USER_ERRORS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);
    const savedUser = await this.userRepository.save(updatedUser);
    return savedUser;
  }

  public async deleteById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    await this.userRepository.remove(user);
    return user;
  }

  public async deleteAll(): Promise<void> {
    await this.userRepository.clear();
  }
}
