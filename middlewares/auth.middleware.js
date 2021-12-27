const jwt = require("jsonwebtoken");
const Users = require("../model/user.model");
const Dishes = require("../model/dish.model");
const Restaurants = require("../model/restaurant.model");
module.exports.protectRoute = async (req, res, next) => {
  if (!req.headers.auth) {
    res.send({
      error: "No authorization specified",
    });
  } else {
    let decoded = jwt.verify(req.headers.auth, "swsh23hjddnns");
    if (decoded.id) {
      var decoded_id = decoded.id;

      const user = await Users.findOne({ _id: decoded_id });
      if (user) {
        req.user = { id: decoded.id, role: user.role };
        next();
      } else {
        console.log("user not found");
        res.status(401).send("Not Authorised to this service");
      }
    }
  }
};

module.exports.authorizeRole = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res
        .send({
          error: "Acess denied for this service",
        })
        .status(401);
    }
  };
};

module.exports.protectRestaurantRoute = async (req, res, next) => {
  if (!req.headers.auth) {
    res.send({
      error: "No authorization specified",
    });
  } else {
    let decoded = jwt.verify(req.headers.auth, "swsh23hjddnns");
    if (decoded.id) {
      var decoded_id = decoded.id;
      // const dish = await Dishes.find()
      const restraunt = await Restaurants.findOne({ _id: decoded_id });

      if (restraunt) {
        req.restaurant = {
          id: decoded.id,
          role: restraunt.role,
          restrauntId: decoded_id,
          email: restaurant.Email,
          name: restraunt.Business_name,
          address: restraunt.Office_address,
          username: restraunt.Username,
        };
        // console.log("sssssssssssssssssssssss",req.restaurant);
        console.log(req.restaurant);
        next();
      } else {
        res.status(404).send("Not Found");
      }
    }
  }
};

module.exports.authorizeRestaurantRole = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.restaurant.role)) {
      next();
    } else {
      res
        .send({
          error: "Acess denied for this service",
        })
        .status(401);
    }
  };
};
