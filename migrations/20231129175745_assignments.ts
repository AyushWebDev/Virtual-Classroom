import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("assignments", function (table) {
        table.uuid("assignment_id").primary().defaultTo(knex.fn.uuid());
        table.string("description").notNullable();
        table.string("tutor_id").notNullable();
        table.dateTime("published_at").defaultTo(knex.fn.now());
        table.dateTime("deadline").notNullable();
        table.enu('status',['SCHEDULED','ONGOING']).notNullable()
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("assignments");
}

