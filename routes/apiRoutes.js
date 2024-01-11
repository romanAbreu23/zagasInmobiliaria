import express from 'express';
import { properties } from '../controllers/apiController.js';

const router = express.Router();

router.get('/propiedades', properties);

export default router;