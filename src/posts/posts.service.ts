import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import PostEntity from './post.entity';
import PostNotFoundException from './exceptions/postNotFound.exception';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import User from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: EntityRepository<PostEntity>,
  ) {}

  getPosts() {
    return this.postRepository.findAll({
      populate: ['author', 'author.address', 'categories'],
    });
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      id,
    });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async createPost(post: CreatePostDto, user: User) {
    const postData = {
      ...post,
      author: user,
    };
    const newPost = await this.postRepository.create(postData);
    await this.postRepository.persistAndFlush(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    const existingPost = await this.getPostById(id);
    wrap(existingPost).assign(post);
    await this.postRepository.persistAndFlush(existingPost);
    return existingPost;
  }

  async getPostsFromCategory(categoryId: number) {
    return this.postRepository.find({
      categories: {
        id: categoryId,
      },
    });
  }

  async deletePost(id: number, withFlush = true) {
    const post = await this.getPostById(id);
    this.postRepository.remove(post);
    if (withFlush) {
      return this.postRepository.flush();
    }
  }

  async getDeletedPost(id: number) {
    const post = await this.postRepository.findOne(
      {
        id,
      },
      {
        filters: {
          softDelete: {
            getOnlyDeleted: true,
          },
        },
      },
    );
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async softDeletePost(id: number) {
    const existingPost = await this.getPostById(id);
    existingPost.deletedAt = new Date();
    await this.postRepository.persistAndFlush(existingPost);
  }
}
