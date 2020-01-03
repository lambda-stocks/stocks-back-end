import userController from './controllers/userController';
import watchlistsController from './controllers/watchlistController';
import stockController from './controllers/stockController';

export default app => {
  // public
  app.route('/api').get((req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.route('/api/login').post(userController.login);
  app.route('/api/register').post(userController.register);

  // protected routes
  //TODO need to protect
  app.route('/api/auth/watchlists').post(watchlistsController.watchlists);
  app.route('/api/auth/stocks').post(stockController.stocks);
  app.route('/api/auth/user/:id').get(userController.getUserById);
};