import authController from './authController';
import orderController from './orderController';
import notificationsController from './notificationsController';
import portfolioController from './portfolioController';
import stockController from './stockController';
import userController from "./userController";
import watchlistsController from './watchlistController';

export const { 
  passport,
  protectedRoute 
} = authController;
export const { 
  createAStockOrder, 
  getOrders,
  getUserOrders 
} = orderController;
export const { 
  createNotifications, 
  getNotifications, 
  getUserNotification 
} = notificationsController;
export const { 
  createPortfolio, 
  getPortfolios,
  getUserPortfolio 
} = portfolioController;
export const { 
  createStock, 
  deleteStock,
  getStockByAttribute, 
  getStocks,
  updateStock
 } = stockController;
export const {
  generateToken, 
  getUserById,
  login,
  register,
} = userController;
export const { 
  getUserWatchList,
  getWatchlists, 
  watchAStock 
} = watchlistsController;
