import db from '../../database/dbConfig';
import { makeCondition } from '../../utils';
require('dotenv').config();

const ENVIRONMENT = process.env.ENVIRONMENT;

async function updateStockHelper(condition, values){
  try {
    const result = await db('stocks')
      .where(condition)
      .update(values);
    return result;
  } catch (err) {
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return err;
    } else {
      return new Error('Something went wrong!');
    }
  }
}

const createStock = async (req, res) => {
  try {
    const { name, open, high, low, close } = req.body;

    if(typeof name != 'string'){
      return res
        .status(400)
        .json({
          error: true,
          message: 'A valid stock name is required!',
        });
    }

    if (!name || !open || !high || !low || !close) {
      return res.status(400).json({ error: true, message: 'name, open, high, low, close is required!' });
    }

    const processedName =  name.toUpperCase();
    const processedValues = { ...req.body, name: processedName };

    const existingStock = await db('stocks').where({ name: processedName });

    if (existingStock.length > 0) {
      const id = existingStock[0].id;
      // update the stock
      const result = await updateStockHelper({ id }, processedValues);
      return result === 1 ? res.status(200).json({ id, message: 'Existing stock updated!' })
        : res
            .status(400)
            .json({ error: true, message: 'Unable to update this stocks, though it already ecists!' });
    } 

    const stock = await db('stocks').insert(processedValues);

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

const deleteStock = async (req, res) => {
  try {
    const { stock_id } = req.body;

    if (!stock_id ) {
      return res.status(400).json({
        error: true,
        message: 'Stock_id is required to make a deletion',
      });
    }

    const result = await db('stocks').where({id: stock_id}).del();
    return res.status(200).json(result);
  } catch (err) {
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log('Something went wrong!');
      return res
        .status(500)
        .json({ error: true, message: 'Error deleting the stock' });
    }
  }
};

const getStockByAttribute = async (req, res) => {
  try {
    const condition = await makeCondition(req.params.attr);

    const stock = await db('stocks').where(condition);
    return res.status(200).json(stock[0]);
  } catch (err) {
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log('Something went wrong!');
      return res
        .status(500)
        .json({ error: true, message: 'Error getting the stock' });
    }
  }
};

const getStocks = async (req, res) => {
  try {
    const stocks = await db('stocks');
    return res.status(200).json(stocks);
  } catch (err) {
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log('Something went wrong!');
      return res
        .status(500)
        .json({ error: true, message: 'Error getting stocks' });
    }
  }
};

const updateStock = async (req, res) => {
  try {
    const { stock_id, open, high, low, close, volume, total_float } = req.body;

    if (!stock_id || !open || !high || !low || !close) {
      return res
        .status(400)
        .json({
          error: true,
          message: 'Stock_id, open, high, low, close is required!',
        });
    }
    const volume_and_float = { volume, total_float}

    const processedValues = { open, high, low, close, ...volume_and_float };
    
    const result = await db('stocks')
      .where({ id: stock_id })
      .update(processedValues);
    return res.status(200).json(result);
  } catch (err) {
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log('Something went wrong!');
      return res
        .status(500)
        .json({ error: true, message: 'Error getting the stock' });
    }
  }
};


export default {
  createStock,
  deleteStock,
  getStockByAttribute,
  getStocks,
  updateStock,
};
