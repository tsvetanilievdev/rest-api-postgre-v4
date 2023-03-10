import {Router} from 'express'
import {body, validationResult} from 'express-validator';
import * as productController from './handlers/product'
import * as updateController from './handlers/update'
import {handleInputErrors} from './modules/middleware'
const router = Router();

/** 
 * Product
*/
router.get('/product', productController.getProducts);
router.get('/product/:id', productController.getOneProduct);
router.put('/product/:id', body('name').notEmpty(),handleInputErrors, productController.updateProduct);
router.post('/product', body('name').notEmpty(), handleInputErrors, productController.createProduct);
router.delete('/product/:id', productController.deleteProduct);

/** 
 * Update
 * 
*/
router.get('/update', updateController.getUpdates)
router.get('/update/:id', updateController.getOneUpdate)
router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).withMessage('Status must be one of "IN_PROGRESS","SHIPPED","DEPRECATED" '), 
    body('version').optional(), 
    body('assests').optional(),
    handleInputErrors,
    updateController.updateOneUpdate)
router.post('/update',  
    body('title').notEmpty(),
    body('body').notEmpty(), 
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).withMessage('Status must be one of "IN_PROGRESS","SHIPPED","DEPRECATED" '), 
    body('version').optional(), 
    body('assests').optional(),
    body('productId').exists(),
    handleInputErrors, 
    updateController.createUpdate)
router.delete('/update/:id', updateController.deleteUpdate)

/** 
 * UpdatePoint
 * 
*/
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.post('/updatepoint', 
    body('name').optional().isString(), 
    body('description').optional().isString(),
    handleInputErrors, 
    (req, res) => {

    })
router.put('/updatepoint/:id', 
    body('name').exists().isString(), 
    body('description').exists().isString(),
    handleInputErrors, 
    (req, res) => {

    })
router.delete('/updatepoint/:id', () => {})


export default router;