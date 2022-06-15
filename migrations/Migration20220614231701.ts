import { Migration } from '@mikro-orm/migrations';

export class Migration20220614231701 extends Migration {

  async up(): Promise<void> {
    this.addSql('create index "post_entity_author_id_index" on "post_entity" ("author_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "post_entity_author_id_index";');
  }

}
