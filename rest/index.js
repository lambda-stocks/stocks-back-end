import {
  createAStockOrder,
  createNotifications,
  createPortfolio,
  createStock,
  deleteStock,
  getStockByAttribute,
  getStocks,
  getUserById,
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
  app.route('/api/auth/notifications').post(createNotifications);
  app.route('/api/auth/portfolios').post(createPortfolio);
  app.route('/api/auth/stocks').get(getStocks).post(createStock).delete(deleteStock).put(updateStock);
  app.route('/api/auth/stocks/:attr').get(getStockByAttribute);
  app.route('/api/auth/stocks/orders').post(createAStockOrder);
  app.route('/api/auth/users/:id').get(getUserById);
  app.route('/api/auth/watchlists').post(watchAStock);
};