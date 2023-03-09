import * as dotenv from 'dotenv';
dotenv.config();
import app from './server';
import config from './config/index';

app.listen(config.port, () => {
    console.log(`API is running at port: ${config.port}`)
})
