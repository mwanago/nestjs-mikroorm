import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import User from '../users/user.entity';

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
}

export default PostEntity;
