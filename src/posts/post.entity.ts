import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class PostEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  content: string;
}

export default PostEntity;
