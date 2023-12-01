import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("submissions", function (table) {
        table.uuid("student_id").notNullable();
        table.uuid('assignment_id').notNullable();
        table.text('remark').nullable();
        table.enu('status',['PENDING','SUBMITTED','OVEREDUE']).notNullable()
        table.primary(['student_id','assignment_id'])
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("submissions");
}

