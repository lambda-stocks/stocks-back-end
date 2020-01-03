exports.up = function (knex) {
  return knex.schema.createTable('watchlists', tbl => {
    tbl.increments('id').primary();
    tbl.int('user_id').notNullable();
    tbl.int('stock_id').notNullable();
    tbl.float('buy_wish_price').defaultTo(null);
    tbl.float('sell_wish_price').defaultTo(null);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('watchlists');
};