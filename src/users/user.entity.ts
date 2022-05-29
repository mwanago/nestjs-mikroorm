import { Entity, Property, PrimaryKey, OneToOne } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import Address from './address.entity';

@Entity()
class User {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  email: string;

  @Property()
  name: string;

  @Property()
  @Exclude()
  password: string;

  @OneToOne({ nullable: true })
  address?: Address;
}

export default User;
