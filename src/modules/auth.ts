import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const comparePasswords = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}

export const hashingPassword = async (password) => {
    return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id:user.id, 
        username: user.username
    }, 
    process.env.JWT_SECRET);

    return token;
}   

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
        res.status(401).json({message: 'Not Authorized'});
        return;
    }

    const [, token] = bearer.split('Bearer '); // that starts our token 'Bearer signedOurToken'
    
    if(!token){
        res.status(401).json({message: 'Not Valid Token'});
        return;
    }
 
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: 'Not Valid Token'});
        return;
    }
}