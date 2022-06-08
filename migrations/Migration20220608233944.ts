import { Migration } from '@mikro-orm/migrations';

export class Migration20220608233944 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post_entity" add column "deleted_at" timestamptz(0) null;');
    this.addSql('create index "post_entity_deleted_at_index" on "post_entity" ("deleted_at");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "post_entity_deleted_at_index";');
    this.addSql('alter table "post_entity" drop column "deleted_at";');
  }

}
