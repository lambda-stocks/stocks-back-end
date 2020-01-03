import db from '../../database/dbConfig';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;

const portfolios = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: true, message: 'user_id is required!' });
    }

    const port = await db('portfolios').insert(req.body);

    if (port.length > 0) {
      return res.status(201).json({ id: port[0] });
    } else {
      return res
        .status(400)
        .json({ error: true, message: 'Unable to create a portfolio' });
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

export default { portfolios };