import express from 'express';
import { body } from 'express-validator';
import { home, contactForm, contactMessage, map, category, error, search } from '../controllers/appController.js';
import identifyUser from '../middleware/userMiddleware.js';

const router = express.Router();

// Pagina de Inicio
router.get('/', identifyUser, home);

// Almacenar los mensajes
router.get('/contacto', identifyUser, contactForm);
router.post('/contacto', identifyUser, 
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio'),
    body('subject').notEmpty().withMessage('Especifíca el asunto'),
    body('message')
        .isLength({ min: 15 }).withMessage('El mensaje no puede ir vacío o es muy corto')
        .isLength({ max: 150 }).withMessage('La descripción es muy larga'),
contactMessage);

// Pagina de Mapa
router.get('/mapa', identifyUser, map);

// Categorias
router.get('/categorias/:id', identifyUser, category);

// Pagina 404
router.get('/404', identifyUser, error);

// // Buscador
// router.post('/buscador', search);

export default router;