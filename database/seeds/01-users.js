exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstName: "testy",
          lastName: "million",
          email: "test@gmail.com",
          username: 'test',
          password: "password"
        },
      ]);
    });
};
