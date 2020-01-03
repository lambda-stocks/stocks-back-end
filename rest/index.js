import userController from './controllers/userController';
import watchlistsController from './controllers/watchlistController';
import stockController from './controllers/stockController';
import orderController from './controllers/orderController';
import portfolioController from './controllers/portfolioController';
import notificationsController from './controllers/notificationsController';

export default app => {
  // public
  app.route('/api').get((req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.route('/api/login').post(userController.login);
  app.route('/api/register').post(userController.register);

  // protected routes
  //TODO need to protect
  app.route('/api/auth/user/:id').get(userController.getUserById);
  app.route('/api/auth/watchlists').post(watchlistsController.watchlists);
  app.route('/api/auth/stocks').post(stockController.stocks);
  app.route('/api/auth/orders').post(orderController.orders);
  app.route('/api/auth/portfolios').post(portfolioController.portfolios);
  app.route('/api/auth/notifications').post(notificationsController.notifications);
};