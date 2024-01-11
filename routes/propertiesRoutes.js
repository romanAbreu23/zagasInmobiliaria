import express from 'express';
import { body } from 'express-validator';
import { admin, search, category, newProperty, saveProperty, addImage, editImage, addNewImage, storeNewImage, storeImage, deleteImage, editProperty, 
    saveChanges, changeStatus, deleteProperty, showProperty, showImages, sendMessage, watchMessage } from '../controllers/propertyController.js';
import protectRoute from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadImage.js';
import identifyUser from '../middleware/userMiddleware.js';

const router = express.Router();

// AdminHome
router.get('/mis-propiedades', protectRoute, identifyUser, admin);

// Buscador
router.post('/buscador', protectRoute, identifyUser, search);

// Categorias
router.get('/mis-categorias/:id', protectRoute, identifyUser, category);

// Agregar propiedad
router.get('/propiedades/nueva', protectRoute, identifyUser, newProperty);
router.post('/propiedades/nueva',
    protectRoute,
    body('title').notEmpty().withMessage('El título del anuncio es obligatorio'),
    body('category').isNumeric().withMessage('Selecciona una categoría'),
    body('landArea').isNumeric().withMessage('Especifica el área total de la propiedad'),
    body('builtArea').isNumeric().withMessage('Especifica el área construida'),
    body('price').isNumeric().withMessage('Selecciona un rango de precios'),
    body('realPrice').isNumeric().withMessage('Especifica el precio de la propiedad'),
    body('bedrooms').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('garage').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('sellRent').notEmpty().withMessage('Especifíca si se vende, renta o ambos'),
    body('pets').notEmpty().withMessage('Especifíca si la propiedad acepta mascotas'),
    body('pool').notEmpty().withMessage('Especifíca si la propiedad cuenta con alberca'),
    body('description')
    .notEmpty().withMessage('La descripción no puede ir vacia')
    .isLength({ max: 600 }).withMessage('La descripción es muy larga'),
    body('lat').isNumeric().withMessage('Ubica la propiedad en el mapa'),
    saveProperty
);
// Agregar imágen
router.get('/propiedades/agregar-imagen/:id', protectRoute, identifyUser, addImage);
router.post('/propiedades/agregar-imagen/:id', protectRoute, identifyUser, upload.array('image', 6), storeImage);
// Editar imágen
router.get('/propiedades/editar-imagen/:id', protectRoute, identifyUser, editImage);
// Eliminar imágen
router.post('/propiedades/eliminar-imagen/:id', protectRoute, identifyUser, deleteImage);
// Añadir nueva imágen
router.get('/propiedades/agregar-nueva-imagen/:id', protectRoute, identifyUser, addNewImage);
router.post('/propiedades/agregar-nueva-imagen/:id', protectRoute, identifyUser, upload.array('image', 6), storeNewImage);

// Editar propiedad
router.get('/propiedades/editar/:id', protectRoute, identifyUser, editProperty);
router.post('/propiedades/editar/:id',
    protectRoute,
    body('title').notEmpty().withMessage('El título del anuncio es obligatorio'),
    body('category').isNumeric().withMessage('Selecciona una categoría'),
    body('landArea').isNumeric().withMessage('Especifica el área total de la propiedad'),
    body('builtArea').isNumeric().withMessage('Especifica el área construida'),
    body('price').isNumeric().withMessage('Selecciona un rango de precios'),
    body('realPrice').isNumeric().withMessage('Especifica el precio de la propiedad'),
    body('bedrooms').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('garage').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('sellRent').notEmpty().withMessage('Especifíca si se vende, renta o ambos'),
    body('pets').notEmpty().withMessage('Especifíca si la propiedad acepta mascotas'),
    body('pool').notEmpty().withMessage('Especifíca si la propiedad cuenta con alberca'),
    body('description')
    .notEmpty().withMessage('La descripción no puede ir vacia')
    .isLength({ max: 600 }).withMessage('La descripción es muy larga'),
    body('lat').isNumeric().withMessage('Ubica la propiedad en el mapa'),
    saveChanges
);

// Cambiar estado de la propiedad
router.put('/propiedades/:id', protectRoute, identifyUser, changeStatus);

// Eliminar propiedad
router.get('/propiedades/eliminar/:id', protectRoute, identifyUser, deleteProperty);

// Ver los mensajes
router.get('/mensajes/:id', protectRoute, identifyUser, watchMessage);

// Aréa Publica
router.get('/propiedad/:id', identifyUser, showProperty);
router.get('/imagenes/:id', identifyUser, showImages);

// Almacenar los mensajes
router.post('/propiedad/:id', identifyUser, 
    body('message')
        .isLength({ min: 15 }).withMessage('El mensaje no puede ir vacío o es muy corto')
        .isLength({ max: 150 }).withMessage('La descripción es muy larga'),
sendMessage);

export default router;