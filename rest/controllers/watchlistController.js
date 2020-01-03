import db from '../../database/dbConfig';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;

const watchAStock = async (req, res) => {
  try {
    const { user_id, stock_id } = req.body;
    if (!user_id || !stock_id) {
      return res.status(400).json({ error: true, message: 'user_id, and stock_id is required!' });
    }

    const watchLists = await db('watchlists').insert(req.body);

    if (watchLists.length > 0) {
      return res.status(201).json({ id: watchLists[0] });
    } else {
      return res
        .status(400)
        .json({ error: true, message: 'Unable to create a watchlist' });
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

export default { watchAStock };