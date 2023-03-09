import merge from 'lodash.merge';

// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "production";
let envConfig;

// dynamically require each config depending on the stage we're in
if(stage === 'production'){
    envConfig = require('./production').default;
}else if(stage === 'testing'){
    envConfig = require('./testing').default;
}else {
    envConfig = require('./local');
}

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl: process.env.DATABASE_URL
    }
}, envConfig)