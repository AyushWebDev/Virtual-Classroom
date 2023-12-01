import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", function (table) {
    table.uuid("user_id").primary().defaultTo(knex.fn.uuid());
    table.string("user_name");
    table.string("user_email").unique();
    table.string("user_password");
    table.enu("user_role",['tutor','student']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
