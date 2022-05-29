import { Migration } from '@mikro-orm/migrations';

export class Migration20220529210655 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "address" ("id" serial primary key, "street" varchar(255) not null, "city" varchar(255) not null, "country" varchar(255) not null);');

    this.addSql('alter table "user" add column "address_id" int null;');
    this.addSql('alter table "user" add constraint "user_address_id_foreign" foreign key ("address_id") references "address" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user" add constraint "user_address_id_unique" unique ("address_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_address_id_foreign";');

    this.addSql('drop table if exists "address" cascade;');

    this.addSql('alter table "user" drop constraint "user_address_id_unique";');
    this.addSql('alter table "user" drop column "address_id";');
  }

}
