import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res, next) => {
//     setTimeout(() => {
//         next(new Error('Async error!'))
//     }, 1000)
// })
app.get('/', (req, res) => {
    res.json({message: 'Hello from server!!!'})
})
app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

//MUST BE LAST OF STACK -- SYNCHRONOUS ERRORS or ASYNC ERRORS passed to next()!!!
app.use((err, req, res, next) => {
    if(err.type == 'auth'){
        res.status(401).json({message: 'unauthorized'});
    }else if (err.type == 'input'){
        res.status(404).json({message: 'invalid input'})
    }else {
        res.status(500).json({message: 'other error'})
    }
  });


export default app;