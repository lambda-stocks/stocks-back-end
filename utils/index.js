import jwt from 'jsonwebtoken';

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

export default {};
