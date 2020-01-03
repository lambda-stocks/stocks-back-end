exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id').primary();
    tbl.string('first_name', 128).notNullable();
    tbl.string('last_name', 128).notNullable();
    tbl.string('email', 128).unique().notNullable();
    tbl.text('password', 128).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};