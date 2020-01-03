import userController from './controllers/userController';
import watchlistsController from './controllers/watchlistController';

export default app => {
  app.route('/api').get((req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.route('/api/login').post(userController.login);
  app.route('/api/register').post(userController.register);
  app.route('/api/auth').post(watchlistsController.watchlists);
};