import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

@Entity()
class User {
  @PrimaryKey()
  public id: number;

  @Property({ unique: true })
  public email: string;

  @Property()
  public name: string;

  @Property()
  @Exclude()
  public password: string;
}

export default User;
