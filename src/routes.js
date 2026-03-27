import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middlewares/auth.js';
import CategoryController from './app/controllers/CategoryController.js';
import adminMiddleware from './app/middlewares/admin.js';
import OrderController from './app/controllers/OrderController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';
import DeliveryFeeController from './app/controllers/DeliveryFeeController.js';

const routes = new Router();

const uploud = multer(multerConfig);

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);
routes.get('/products', ProductController.index);
routes.get('/categories', CategoryController.index);

routes.use(authMiddleware);
routes.post('/products', adminMiddleware, uploud.single('file'), ProductController.store);
routes.put('/products/:id', adminMiddleware, uploud.single('file'), ProductController.update);
routes.delete('/products/:id', authMiddleware, ProductController.destroy);

routes.post('/categories', adminMiddleware, uploud.single('file'), CategoryController.store);
routes.put('/categories/:id', adminMiddleware, uploud.single('file'), CategoryController.update);
routes.delete('/categories/:id', adminMiddleware, CategoryController.destroy);

routes.post('/orders', OrderController.store);
routes.put('/orders/:id', adminMiddleware, OrderController.update);
routes.get('/orders', OrderController.index);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

routes.get('/delivery-fee', DeliveryFeeController.show);
routes.put('/delivery-fee', DeliveryFeeController.update);

export default routes;
