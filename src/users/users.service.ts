import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import User from './user.entity';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne(
      {
        email,
      },
      {
        populate: ['address', 'posts'],
      },
    );
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne(
      {
        id,
      },
      {
        populate: ['address'],
      },
    );
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = await this.userRepository.create(user);
    await this.userRepository.persistAndFlush(newUser);
    return newUser;
  }
}

export default UsersService;
