exports.up = function (knex) {
  return knex.schema.createTable('orders', tbl => {
    tbl.increments('id').primary();
    tbl.foreign('id').references('stocks');
    tbl.foreign('id').references('users');
    tbl.float('buy_price').defaultTo(0);
    tbl.float('sell_price').defaultTo(0);
    tbl.int('action').defaultTo(0);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('orders');
};