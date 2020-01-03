import authController from './authController';
import userController from "./userController";

export const {
  generateToken, 
  getUserById,
  login,
  register,
} = userController;

export const { protectedRoute } = authController;