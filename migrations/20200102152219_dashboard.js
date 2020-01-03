exports.up = function (knex) {
  return knex.schema.createTable('stocks', tbl => {
    tbl.increments('id').primary();
    tbl.string('name', 128).notNullable();
    tbl.float('open').notNullable();
    tbl.float('high').notNullable();
    tbl.float('low').notNullable();
    tbl.float('close').notNullable();
    tbl.float('volume').defaultTo(null);
    tbl.int('total_float').defaultTo(null);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('stocks');
};