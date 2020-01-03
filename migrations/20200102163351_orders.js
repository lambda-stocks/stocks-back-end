exports.up = function (knex) {
  return knex.schema.createTable('orders', tbl => {
    tbl.increments('id').primary();
    tbl.int('stock_id').notNullable();
    tbl.int('user_id').notNullable();
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