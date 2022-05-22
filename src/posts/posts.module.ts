import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostsController from './posts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import PostEntity from './post.entity';

@Module({
  imports: [MikroOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
