import { getUserById, login, register } from './controllers';
import watchlistsController from './controllers/watchlistController';

export default app => {
  // public
  app.route('/api').get((req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.route('/api/login').post(login);
  app.route('/api/register').post(register);

  // protected routes
  //TODO need to protect
  app.route('/api/auth/watchlist').post(watchlistsController.watchlists);
  app.route('/api/auth/user/:id').get(getUserById);
};