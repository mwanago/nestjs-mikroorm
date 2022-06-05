import { Module } from '@nestjs/common';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Category from './category.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [MikroOrmModule.forFeature([Category]), PostsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export default class CategoriesModule {}
