import { Migration } from '@mikro-orm/migrations';

export class Migration20220522201347 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post_entity" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post_entity" cascade;');
  }

}
