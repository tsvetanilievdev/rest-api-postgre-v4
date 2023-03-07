import {Router} from 'express'
import {body, validationResult} from 'express-validator';
import {handleInputErrors} from './modules/middleware'
const router = Router();

/** 
 * Product
*/
router.get('/product', (req, res) => {
    res.json({message: [1,2,3,4]})
})
router.get('/product/:id', () => {})
router.put('/product/:id', body('name').notEmpty(), (req, res) => {
   res.json({message: `${req.params.id} has name: ${req.body.name}`});
})
router.post('/product', body('name').notEmpty(), handleInputErrors, () => {

})
router.delete('/product/:id', () => {})

/** 
 * Update
 * 
*/
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id', 
    body('title').optional(),
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).withMessage('Status must be one of "IN_PROGRESS","SHIPPED","DEPRECATED" '), 
    body('version').optional(), 
    body('assests').optional(),
    handleInputErrors,
    (req, res) => {

})
router.post('/update',  
    body('title').notEmpty(),
    body('body').notEmpty(), 
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).withMessage('Status must be one of "IN_PROGRESS","SHIPPED","DEPRECATED" '), 
    body('version').optional(), 
    body('assests').optional(),
    handleInputErrors, 
    (req, res) => {

})
router.post('/update', () => {

})
router.delete('/update/:id', () => {})

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