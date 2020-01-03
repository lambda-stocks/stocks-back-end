import db from '../../database/dbConfig';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;

const createPortfolio = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: true, message: 'user_id is required!' });
    }

    const existingUser = await db('users').where({ id: user_id });

    if (existingUser.length < 1) {
      return res
        .status(400)
        .json({ error: true, message: 'The given user does not exist' });
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

const getPortfolios = async (req, res) => {
  try {
    const portfolio = await db('portfolios');
    return res.status(200).json(portfolio);
  } catch (err) {
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log('Something went wrong!');
      return res
        .status(500)
        .json({ error: true, message: 'Error getting portfolio' });
    }
  }
};

//TODO
const getUserPortfolio = async (req, res) => {};

export default { createPortfolio, getPortfolios, getUserPortfolio };
