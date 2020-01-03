exports.up = function (knex) {
  return knex.schema.createTable('watchlists', tbl => {
    tbl.increments('id').primary();
    tbl.integer("user_id").unsigned();
    tbl.integer("stock_id").unsigned();
    tbl.float('buy_wish_price').defaultTo(null);
    tbl.float('sell_wish_price').defaultTo(null);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());

    tbl.foreign("user_id").references("users.id")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.foreign("stock_id").references("stocks.id")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('watchlists');
};