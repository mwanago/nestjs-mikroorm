import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  Collection,
  ManyToMany,
  Index,
} from '@mikro-orm/core';
import User from '../users/user.entity';
import Category from '../categories/category.entity';
import WithSoftDelete from '../utils/withSoftDelete';

@Entity()
@WithSoftDelete()
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

  @Index()
  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date;
}

export default PostEntity;
