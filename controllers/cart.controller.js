const {addToCart,getCartDishes,deleteCart,editCart,getCartDishesById,getCartDishById} = require('../services/cart.service');

module.exports.addToCartController = async(req,res)=>{
 
  try{
    
    const quantity = req.body.quantity;
    if(quantity<=0){
      return res.status(400).json({
        status: false,
        msg: 'Quantity should be positive'
      })
    }
    const added_to_cart_dishes = await addToCart(req.params.id,req.body,req.user.id);
    if(added_to_cart_dishes){
      return res.status(200).json({
        status: true,
        msg: 'product added to cart successfully',
        data: added_to_cart_dishes
      })
    }
    return res.status(500).json({
      status: false,
      msg:'server error'
    })
  }
  catch(error){
    return error;  
  }
}


module.exports.getCartDishesController = async(req,res)=>{
  const dishes_in_cart = await getCartDishes();
  if(dishes_in_cart){
    return res.status(200).json({
      status: true,
      msg: "dishes in cart",
      data: dishes_in_cart
    })
  }
  return res.status(404).json({
    status: false,
    msg: 'No Dishes Found In Cart'
  })
}

module.exports.deleteCartController = async(req,res)=>{
  try{
  const carts = await deleteCart(req.params);
  if(!carts) return res.status(404).json({
    status: false,
    msg: 'Not Found'
  })
  return res.status(200).json({
    status: true,
    msg: 'Cart Deleted Successfully'
  })
}
catch(error){
  return error;
}
}

module.exports.editCartontroller = async(req,res)=>{
  const cartResponse = await editCart(req.params.id,req.body,req.user.id);
  if(cartResponse == 'invalid credentials'){
    return res.status(400).json({
      status: false,
      msg: 'Invalid Credentials'
    })
  }
  else if(cartResponse == 'Cart Not Found'){
    return res.status(404).json({
      status: false,
      msg: 'Cart Not Found'
    })
  }
  else if(cartResponse == 'Faile To Update Cart'){
    return res.status(400).json({
      status: false,
      msg: 'Faile To Update Cart'
    })
  }
  return res.status(201).json({
    status: true,
    msg: 'Successfully Updated Cart'
  })
}


module.exports.getCartDishesByIdController = async(req,res)=>{
  const carts = await getCartDishesById(req.user.id);
  if(carts){
    return res.status(200).json({
      status: true,
      msg: "product",
      data: carts
    })
  }
  return res.status(400).json({
    status: false,
    msg: "Failed to load cart, check your credentials"
  })
}

module.exports.getCartDishByIdController = async(req,res)=>{
  const dish = await getCartDishById(req.params.id,req.user.id);
  if(dish){
    return res.status(200).json({
      status: true,
      data: dish
    })
  }
  return res.status(400).json({
    status: false,
    msg:'NOT FOUND'
  })
}