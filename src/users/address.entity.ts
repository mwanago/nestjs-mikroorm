import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
class Address {
  @PrimaryKey()
  id: number;

  @Property()
  street: string;

  @Property()
  city: string;

  @Property()
  country: string;
}

export default Address;
