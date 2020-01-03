import db from '../../database/dbConfig';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;

const stocks = async (req, res) => {
  try {
    const { name, open, high, low, close } = req.body;
    if (!name || !open || !high || !low || !close) {
      return res.status(400).json({ error: true, message: 'name, open, high, low, close is required!' });
    }

    const stock = await db('stocks').insert(req.body);

    if (stock.length > 0) {
      return res.status(201).json({ id: stock[0] });
    } else {
      return res
        .status(400)
        .json({ error: true, message: 'Unable to create a stocks' });
    }
  } catch (err) {
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log("Something went wrong!");
      return res
        .status(500)
        .json({ error: true, message: "Error adding to the database" });
    }
  }
};

export default { stocks };