import prisma from "../db";
import { createJWT, hashingPassword, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashingPassword(req.body.password)
            }
        })
    
        const token = createJWT(user);
        res.json({token})
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        console.log(error.message)
        error.type = 'input' // we assume that because of that, INSPECT error object to find it out!!!
        next(error) // pass the error to next() and then catch it by the custom handler
    }
}

export const signin = async (req, res) => {
    console.log('login....')
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password);

    if(!isValid){
        res.status(401).json({message: 'Not Authorized'});
        return;
    }

    const token = createJWT(user);
    res.json({token})
}