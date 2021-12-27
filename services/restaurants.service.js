const bcrypt = require("bcrypt");
const Restaurants = require("../model/restaurants.model");

module.exports.createNewRestaurant = async ({
  business_name,
  email,
  username,
  password,
  location,
}) => {
  const salt = bcrypt.genSalt(10);
  await bcrypt.hash(password, salt).then((hashedPassword) => {
    const restaurant = new Restaurants({
      business_name: business_name,
      email: email,
      username: username,
      Password: hashedPassword,
      location: location,
    });
    restaurant.save();
    return restaurant;
  });
};

module.exports.getAllRestaurants = async () => {
  const restaurants = await Restaurants.find({});
  return restaurants;
};

module.exports.getRestrauntById = async ({ id }) => {
  const restraunt = await Restaurants.findOne({ _id: id });
  return restraunt;
};

module.exports.deleteRestaurant = async ({ id }) => {
  await Restaurants.findOneAndRemove({ _id: id }, () => {
    return true;
  });
};

module.exports.updateRestaurant = async (restraunt_id, newRestraunt) => {
  await Restaurants.findOneAndUpdate(
    { _id: restraunt_id },
    newRestraunt,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
    () => {
      return true;
    }
  );
};

module.exports.LoginRestaurant = async ({ email, password }) => {
  await Restaurants.findOne({ email: email }).then((restaurant) => {
    if (!restaurant) {
      return false;
    } else {
      await bcrypt.compare(password, restaurant.password).then((response) => {
        if (!response) {
          return false;
        } else {
          return restaurant;
        }
      });
    }
  });
};
