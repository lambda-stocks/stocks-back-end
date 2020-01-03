import {
  createAStockOrder,
  createNotifications,
  createPortfolio,
  createStock,
  deleteStock,
  getNotifications,
  getOrders,
  getPortfolios,
  getStockByAttribute,
  getStocks,
  getUserById,
  getUserNotification,
  getUserPortfolio,
  getUserOrders,
  getWatchlists,
  getUserWatchList,
  login,
  protectedRoute,
  register,
  updateStock,
  watchAStock,
} from './controllers';

export default app => {
  // public
  app.route('/api').get((req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.route('/api/login').post(login);
  app.route('/api/register').post(register);

  // protected routes
  app.use('/api/auth', protectedRoute);
  app.route('/api/auth/notifications').get(getNotifications).post(createNotifications);
  app.route('/api/auth/notification/:user_id').get(getUserNotification);
  app.route('/api/auth/portfolios').get(getPortfolios).post(createPortfolio);
  app.route('/api/auth/portfolios/:user_id').get(getUserPortfolio);
  app.route('/api/auth/stocks').get(getStocks).post(createStock).delete(deleteStock).put(updateStock);
  app.route('/api/auth/stocks/:attr').get(getStockByAttribute);
  app.route('/api/auth/orders').get(getOrders).post(createAStockOrder);
  app.route('/api/auth/orders/:user_id').get(getUserOrders);
  app.route('/api/auth/users/:id').get(getUserById);
  app.route('/api/auth/watchlists').get(getWatchlists).post(watchAStock);
  app.route('/api/auth/watchlists/:user_id').get(getUserWatchList);
};