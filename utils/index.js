import jwt from "jsonwebtoken";

export const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1hr',
  };

  return jwt.sign(payload, process.env.SECRET, options);
};

export const makeCondition = value => {
  return Number.isNaN(Number(value))
    ? { name: value.toUpperCase() }
    : { id: value };
};