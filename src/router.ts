import {Router} from 'express'
import {body, validationResult} from 'express-validator';

const router = Router();

/** 
 * Product
*/
router.get('/product', (req, res) => {
    res.json({message: [1,2,3,4]})
})
router.get('/product/:id', () => {})
router.put('/product/:id', body('name').notEmpty(), (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }
})
router.post('/product', () => {})
router.delete('/product/:id', () => {})

/** 
 * Update
 * 
*/
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.post('/update', () => {})
router.put('/update/:id', () => {})
router.delete('/update/:id', () => {})

/** 
 * UpdatePoint
 * 
*/
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.post('/updatepoint', () => {})
router.put('/updatepoint/:id', () => {})
router.delete('/updatepoint/:id', () => {})


export default router;