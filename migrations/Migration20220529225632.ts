import { Migration } from '@mikro-orm/migrations';

export class Migration20220529225632 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post_entity" add column "author_id" int not null;');
    this.addSql('alter table "post_entity" add constraint "post_entity_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post_entity" drop constraint "post_entity_author_id_foreign";');

    this.addSql('alter table "post_entity" drop column "author_id";');
  }

}
