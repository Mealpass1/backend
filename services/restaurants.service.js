const bcrypt = require("bcrypt");
const Restaurant = require("../model/restaurant.model");

module.exports.createNewRestaurant = async ({
  business_name,
  email,
  username,
  password,
  location,
}) => {
  await bcrypt.genSalt(10, async (err, salt) => {
    await bcrypt.hash(password, salt).then((hashedPassword) => {
      const restaurant = new Restaurant();
      return new Promise((resolve, _) => {
        restaurant.business_name = business_name;
        restaurant.username = username;
        restaurant.email = email;
        restaurant.location = location;
        restaurant.password = hashedPassword;
        restaurant.save();
        resolve(restaurant);
      });
    });
  });
};

module.exports.getAllRestaurants = async () => {
  const restaurants = await Restaurant.find({});
  return restaurants;
};

module.exports.getRestrauntById = async ({ id }) => {
  const restraunt = await Restaurant.findOne({ _id: id });
  return restraunt;
};

module.exports.deleteRestaurant = async ({ id }) => {
  await Restaurant.findOneAndRemove({ _id: id }, () => {
    return true;
  });
};

module.exports.updateRestaurant = async (restraunt_id, newRestraunt) => {
  await Restaurant.findOneAndUpdate(
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
