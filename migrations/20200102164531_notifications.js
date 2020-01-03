exports.up = function (knex) {
  return knex.schema.createTable('notifications', tbl => {
    tbl.increments('id').primary();
    tbl.int('user_id').notNullable();
    tbl.varchar('message');
    tbl.int('seen').defaultTo(0);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notifications');
};