import PostEntity from './posts/post.entity';
import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import User from './users/user.entity';
import Address from './users/address.entity';
import Category from './categories/category.entity';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [PostEntity, User, Address, Category],
  type: 'postgresql',
  dbName: configService.get('POSTGRES_DB'),
  user: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
};

export default MikroOrmConfig;
