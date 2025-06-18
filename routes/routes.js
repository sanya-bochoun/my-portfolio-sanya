import express, { Router } from 'express';
import { homeController,contactUserController } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', homeController)
router.post('/contact', contactUserController);

export default router;

