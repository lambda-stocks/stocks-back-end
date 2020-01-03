exports.up = function (knex) {
  return knex.schema.createTable('notifications', tbl => {
    tbl.increments('id').primary();
    tbl.integer("user_id").unsigned();
    tbl.varchar('message').notNullable();
    tbl.int('seen').defaultTo(0);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());

    tbl.foreign("user_id").references("users.id")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notifications');
};