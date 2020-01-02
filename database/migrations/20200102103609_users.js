exports.up = function (knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('users_id').primary();
    tbl.string('firstName', 128).notNullable();
    tbl.string('lastName', 128).notNullable();
    tbl.string('email', 128).notNullable();
    tbl.string('username', 128).unique().notNullable();
    tbl.text('password', 128).notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};