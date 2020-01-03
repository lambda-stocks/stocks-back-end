import db from '../../database/dbConfig';
import bcjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import emailValidator from 'email-validator';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT; 

const  generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1hr',
  };

  return jwt.sign(payload, process.env.SECRET, options);
};

const register = async (req, res) => {
  try{
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({error: true, message: 'firstname, lastname, email and password is required!'});
    }

    if (!emailValidator.validate(email)){
      return res.status(400).json({error: true, message: 'provide a valid email'});
    }

    const existingUser = await db('users').where({ email });

    if(existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: true, message: 'Email address is already registered' });
    }

    const hash = await bcjs.hash(password, 10);

    // reaching here means we have valid data
    const validatedEntries = {...req.body, password: hash };

    const newUser = await db('users').insert(validatedEntries);

    if(newUser.length > 0){
      return res.status(201).json({id: newUser[0]});
    } else{
      return res
        .status(400)
        .json({ error: true, message: 'Unable to create a new user' });
    }
  }catch(err){
    if(ENVIRONMENT === 'development'){
      console.log(err);
      return res.json(err);
    }else{
      console.log("Something went wrong!");
      return res
        .status(500)
        .json({ error: true, message: 'Error adding a new user to the database' });
    }
  }
};
  
const login = async (req, res) => {
  try{
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          error: true,
          message: 'email and password is required!',
        });
    }

    const user = await db('users').where({ email });

    const userAndPasswordValid = user.length > 0 ? await bcjs.compare(password, user[0].password) : false;

    if (userAndPasswordValid) {
      const token = await generateToken(user[0]);
      return res
        .status(200)
        .json({
          message: `Welcome ${user[0].first_name}! Here's a token: `,
          token: token,
        });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }catch(err){
    if (ENVIRONMENT === 'development') {
      console.log(err);
      return res.json(err);
    } else {
      console.log('Something went wrong!');
      return res
        .status(500)
        .json({
          error: true,
          message: 'Error logging in',
        });
    }
  }
};

export default {
  generateToken, 
  login,
  register,
};