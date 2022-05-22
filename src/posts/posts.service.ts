import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import PostEntity from './post.entity';
import PostNotFoundException from './exceptions/postNotFound.exception';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: EntityRepository<PostEntity>,
  ) {}

  getPosts() {
    return this.postRepository.findAll();
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

  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);
    await this.postRepository.persistAndFlush(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    const existingPost = await this.getPostById(id);
    wrap(existingPost).assign(post);
    await this.postRepository.persistAndFlush(existingPost);
    return existingPost;
  }

  async deletePost(id: number) {
    const post = await this.getPostById(id);
    return this.postRepository.removeAndFlush(post);
  }
}
