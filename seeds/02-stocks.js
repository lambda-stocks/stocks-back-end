exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('stocks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('stocks').insert([
        {
          name: "Amazon",
          open: 600,
          high: 1500,
          low: 1000,
          close: 1500,
        },
      ]);
    });
};
