import app from './app';
import "./database/dbConnector";
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
  if (err) {
    return console.log(`\u274c  Error encountered ${err}\n`);
  }
  console.log(`\u2705  API is running on port ${PORT}\n`);
});
