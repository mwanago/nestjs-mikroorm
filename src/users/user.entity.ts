import {
  Entity,
  Property,
  PrimaryKey,
  OneToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import Address from './address.entity';
import PostEntity from '../posts/post.entity';

@Entity()
class User {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  email: string;

  @Property()
  name: string;

  @Property({ hidden: true })
  password: string;

  @OneToOne({ nullable: true })
  address?: Address;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.author)
  posts: Collection<PostEntity>;
}

export default User;
