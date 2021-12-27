const {
  createNewRestaurant,
  getAllRestaurants,
  getRestrauntById,
  deleteRestaurant,
  updateRestaurant,
  LoginRestaurant,
  restaurantProfile,
} = require("../services/restaurants.service");
const jwt = require("jsonwebtoken");
const { checkRestaurantExistence } = require("../helpers/restaurant.exists");

module.exports.createNewRestaurantController = async (req, res) => {
  if (
    (await checkRestaurantExistence(
      req.body.Email,
      req.body.Business_name,
      req.body.Username
    )) === true
  ) {
    return res.status(400).send({
      message: "restaurant exists",
    });
  }
  const results = await createNewRestaurant(req.body);
  if (results) {
    return res.status(200).json({
      status: true,
      msg: "restaurant successfully saved",
    });
  }
  return res.status(400).json({
    status: false,
    msg: "Failed to create restaurant",
  });
};

module.exports.getAllRestaurantsController = async (_, res) => {
  const restraunts = await getAllRestaurants();
  if (restraunts) {
    return res.status(200).json({
      message: "Restraunts List: ",
      data: restraunts,
    });
  }
  return res.status(404).send("No Restaurants Found");
};

module.exports.getRestrauntByIdController = async (req, res) => {
  const restraunt = await getRestrauntById(req.params);
  if (restraunt) {
    return res.status(200).json({
      message: "Result: ",
      data: restraunt,
    });
  }
  return res.status(404).send("No Corresponding Restraunt Found");
};

module.exports.deleteRestrauntController = async (req, res) => {
  const results = await deleteRestaurant(req.params);
  if (results) {
    return res.status(200).json({
      message: "Restaurant deleted successfully",
      data: results,
    });
  }
  return res.status(404).send("No Corresponding Restraunt Found");
};

module.exports.updateRestaurantController = async (req, res) => {
  const updatedRestraunt = await updateRestaurant(req.params.id, req.body);
  if (updatedRestraunt) {
    return res.status(200).send("Restraunt Updated Successfully");
  }
  return res.status(400).send("Failed To Update The Restraunt");
};

module.exports.LoginRestaurantController = async (req, res) => {
  const loggedInRestaurant = await LoginRestaurant(req.body);
  if (loggedInRestaurant) {
    const id = loggedInRestaurant._id;
    let payload = { id };
    let accessToken = jwt.sign(payload, "swsh23hjddnns", {
      algorithm: "HS256",
      expiresIn: 86400,
    });
    res.cookie("jwt", accessToken, { secure: true, httpOnly: true });
    res.status(200).send({
      token: accessToken,
      message: "Login successful",
    });
  }
};

module.exports.restaurantProfileController = async (req, res) => {
  const profile = await restaurantProfile(req.restaurant.restrauntId, req.body)
    .then((response) => {
      return res.status(200).json({
        message: "Restaurant profile",
        status: "ok",
        data: profile,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "server error",
        status: "Failed",
      });
    });
};
