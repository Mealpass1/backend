const Checkout = require('../model/checkout.model');
const Cart = require('../model/Cart.model');

module.exports.addToCheckOut = async(userId)=>{
  let carts = await Cart.find();
   let dishNames=[];
  let sub_total=0;
  if(carts){
      for(let cart of carts){
        sub_total = sub_total + cart.total;
        dishNames.push(cart.dishName);
      }
      console.log("dishNames: ",dishNames);
      let serviceFee = sub_total * 0.01;
      let total = serviceFee + sub_total;
       const checkout = new Checkout();
       checkout.mealCost = sub_total;
       checkout.ServiceFee = serviceFee;
       checkout.Taxes = 0;
       checkout.Total = total;
       checkout.products = dishNames;
       checkout.userId = userId;
       checkout.save();
       return checkout;
  }
  return false;
}

module.exports.getCheckOuts = async()=>{
  const checkouts = await Checkout.find();
  if(checkouts){
    return checkouts;
  }
  return false;
}