const { UserModel } = require("../model/user.model");

const cartController = async (req, res) => {
  try {
    // const loggedInuserId = req.body.user;
    const product = req.body.product;
    if (product) {
      const user = await UserModel.findOne({_id: "64e1b6e34b18f44b73b40cb7"});
      if (user) {
        user.cart.push(product);
        await user.save();
        res.status(200).json({ message: "Product added successfully!" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const cartRecieveController = async (req, res) => {
  try {
    if (true) {
      //hard coded currently for prototype purposes will be completely dynamic when final product
      const user = await UserModel.findOne({_id: "64e1b6e34b18f44b73b40cb7"});
      if (user) {
        console.log(user)
        res
          .status(200)
          .json({ data: user.cart, bought: user.bought });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  cartRecieveController,
  cartController,
};
