const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,'database/lambdastocks.sqlite3')
    },
    useNullAsDefault: true
  },
};
