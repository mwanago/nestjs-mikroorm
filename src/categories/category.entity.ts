import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class Category {
  @PrimaryKey()
  public id: number;

  @Property()
  public name: string;
}

export default Category;
