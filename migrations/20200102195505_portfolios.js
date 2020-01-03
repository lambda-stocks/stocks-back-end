exports.up = function (knex) {
  return knex.schema.createTable('portfolios', tbl => {
    tbl.increments('id').primary();
    tbl.integer("user_id").unsigned();
    tbl.int('level_of_experience').defaultTo(0);
    tbl.float('net_worth').defaultTo(0);
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());

    tbl.foreign("user_id").references("users.id")
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('portfolios');
};