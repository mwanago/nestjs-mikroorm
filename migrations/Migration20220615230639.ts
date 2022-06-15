import { Migration } from '@mikro-orm/migrations';

export class Migration20220615230639 extends Migration {

  async up(): Promise<void> {
    this.addSql('create index "post_entity_author_id_deleted_at_index" on "post_entity" ("author_id", "deleted_at");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "post_entity_author_id_deleted_at_index";');
  }

}
