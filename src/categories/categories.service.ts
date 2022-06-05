import { Injectable } from '@nestjs/common';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import Category from './category.entity';
import { PostsService } from '../posts/posts.service';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export default class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    private readonly postsService: PostsService,
    private readonly entityManager: EntityManager,
  ) {}

  getAllCategories() {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({
      id,
    });
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    return category;
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoryRepository.create(category);
    await this.categoryRepository.persistAndFlush(newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    const existingCategory = await this.getCategoryById(id);
    wrap(existingCategory).assign(category);
    await this.categoryRepository.persistAndFlush(existingCategory);
    return existingCategory;
  }

  async deleteCategory(id: number, withFlush = true) {
    const category = await this.getCategoryById(id);
    this.categoryRepository.remove(category);
    if (withFlush) {
      return this.categoryRepository.flush();
    }
  }

  async deleteCategoryWithPosts(categoryId: number) {
    const allPosts = await this.postsService.getPostsFromCategory(categoryId);
    for (const post of allPosts) {
      await this.postsService.deletePost(post.id, false);
    }
    await this.deleteCategory(categoryId);
    return this.entityManager.flush();
  }
}
