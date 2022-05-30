import { Migration } from '@mikro-orm/migrations';

export class Migration20220530004103 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "post_entity_categories" ("post_entity_id" int not null, "category_id" int not null);');
    this.addSql('alter table "post_entity_categories" add constraint "post_entity_categories_pkey" primary key ("post_entity_id", "category_id");');

    this.addSql('alter table "post_entity_categories" add constraint "post_entity_categories_post_entity_id_foreign" foreign key ("post_entity_id") references "post_entity" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "post_entity_categories" add constraint "post_entity_categories_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post_entity_categories" drop constraint "post_entity_categories_category_id_foreign";');

    this.addSql('drop table if exists "category" cascade;');

    this.addSql('drop table if exists "post_entity_categories" cascade;');
  }

}
