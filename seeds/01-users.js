exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: "testy",
          last_name: "million",
          email: "test@gmail.com",
          password: "password"
        },
      ]);
    });
};
