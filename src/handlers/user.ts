import prisma from "../db";
import { createJWT, hashingPassword, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res) => {
    console.log('creating....')
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashingPassword(req.body.password)
        }
    })

    const token = createJWT(user);
    res.json({token})

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