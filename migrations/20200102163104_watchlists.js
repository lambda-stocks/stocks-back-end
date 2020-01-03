exports.up = function (knex) {
  return knex.schema.createTable('watchlists', tbl => {
    tbl.increments('id').primary();
    tbl.float('buy_wish_price').defaultTo(null);
    tbl.float('sell_wish_price').defaultTo(null);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());

    tbl.foreign('id').references('users');
    tbl.foreign('id').references('stocks');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('watchlists');
};