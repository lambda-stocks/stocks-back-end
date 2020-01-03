import db from '../../database/dbConfig';
require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;

const createNotifications = async (req, res) => {
  try {
    const { user_id, message } = req.body;
    if (!user_id || !message) {
      return res
        .status(400)
        .json({ error: true, message: 'user_id and notification message is required!' });
    }

    const existingUser = await db('users').where({ id: user_id });

    if (existingUser.length < 1) {
      return res
        .status(400)
        .json({ error: true, message: 'The given user does not exist' });
    }

    const notification = await db('notifications').insert(req.body);

    if (notification.length > 0) {
      return res.status(201).json({ id: notification[0] });
    } else {
      return res
        .status(400)
        .json({ error: true, message: 'Unable to create a notifications' });
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

export default { createNotifications };
