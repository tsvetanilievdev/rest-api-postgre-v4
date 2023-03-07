import prisma from '../db';

export const getUpdates = async (req,res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) =>{
        return [...allUpdates, ...product.updates] 
    }, []) // if you do this, you make something wrong!!!
    //do NOT stora data in memory!!
    //thing about new schema

    res.json({data: updates})
} 

export const getOneUpdate = async (req,res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    }) 

    res.json({data: update});
}

export const createUpdate = async (req, res) => {
    const id = req.body.productId;
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if(!product){
        res.json({message: 'Not such product!'})
    }

    const update = await prisma.update.create({
        data: req.body
    })

    res.json({data: update});
}

export const updateOneUpdate = async (req, res) => {
    const id = req.params.id;
    const updated = await prisma.update.update({
        where: {
            id
        },
        data: {
            title: req.body.title,
            body: req.body.body,
            productId: req.body.productId
        }
    })

    res.json({data: updated})
}

export const deleteUpdate = async (req, res) => {
    const id = req.params.id;
    const deleted = await prisma.update.delete({
        where: {
            id
        }
    })

    res.json({data: deleted})
}