import jwt from "jsonwebtoken";

export const generateToken = user => {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: '48hr',
  };

  return jwt.sign(payload, process.env.SECRET, options);
};

export const makeCondition = value => {
  return Number.isNaN(Number(value))
    ? { name: value.toUpperCase() }
    : { id: value };
};