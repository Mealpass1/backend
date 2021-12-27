const {addToCheckOut,getCheckOuts} = require('../services/checkout.service');


module.exports.addToCheckOutController = async(req,res)=>{
        const checkouts = await addToCheckOut(req.user.id);
        if(checkouts) return res.status(201).json({
            status: true,
            msg: 'order successfully created',
        })
        return res.status(400).json({
            status: false,
            msg: 'Your Cart Is Empty'
        })
}

module.exports.getCheckOutsController = async(_,res)=>{
    const checkouts = await getCheckOuts();
    if(checkouts){
        return res.status(200).json({
            status: true,
            msg: "Your transactions",
            orders:checkouts
        })
    }
    return res.status(400).json({
        status: false,
        msg: "Failed to load transactions"
    })
}