import { Entity, Property, PrimaryKey, OneToOne } from '@mikro-orm/core';
import Address from './address.entity';

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
}

export default User;
