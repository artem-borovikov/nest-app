import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  public async create(createUserDto: CreateUserDto): Promise<{ id: number }> {
    const existingUser = await this.userRepository.findOne({
      where: { full_name: createUserDto.full_name },
    });

    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким именем уже существует!',
      );
    }

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
      .skip(filters?.offset || 0)
      .take(filters?.limit || 10)
      .getManyAndCount();

    return { users, total };
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
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
