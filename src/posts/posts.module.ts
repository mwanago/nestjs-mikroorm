import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostsController from './posts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import PostEntity from './post.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MikroOrmModule.forFeature([PostEntity]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
