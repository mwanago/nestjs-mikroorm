import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Collection,
  ManyToMany,
} from '@mikro-orm/core';
import User from '../users/user.entity';
import Category from '../categories/category.entity';

@Entity()
class PostEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @ManyToOne()
  author: User;

  @ManyToMany(() => Category)
  categories: Collection<Category>;
}

export default PostEntity;
