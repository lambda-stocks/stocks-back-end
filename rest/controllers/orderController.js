import db from '../../database/dbConfig';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;

const createAStockOrder = async (req, res) => {
  try {
    const { user_id, stock_id } = req.body;
    if (!user_id || !stock_id) {
      return res.status(400).json({ error: true, message: 'user_id, stock_id is required!' });
    }

    const existingUser = await db('users').where({ id: user_id });

    if (existingUser.length < 1) {
      return res
        .status(400)
        .json({ error: true, message: 'The given user does not exist' });
    }

    const existingStock = await db('stocks').where({ id: stock_id });

    if (existingStock.length < 1) {
      return res
        .status(400)
        .json({ error: true, message: 'The given stock id does not exist' });
    }

    const order = await db('orders').insert(req.body);

    if (order.length > 0) {
      return res.status(201).json({ id: order[0] });
    } else {
      return res
        .status(400)
        .json({ error: true, message: 'Unable to create an order' });
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

export default { createAStockOrder };