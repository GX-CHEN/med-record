import User from "../models/userModel";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  console.log("inside signup");
  const data = req.body;

  User.find({ username: data.username }, async function(err, docs) {
    if (docs.length) {
      res.status(200).send(`user ${data.username} already exist`);
    } else {
      const user = new User({
        ...data
      });
      await user.save();
      res.status(200).send(user._id);
    }
  });
};

export const login = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username: username }).exec(function(err, user) {
    if (err) {
      return res.status(200).send("login fail, something went wrong");
    } else if (!user) {
      return res.status(200).send(`login fail, user ${username} not exist`);
    } else {
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          return res.status(200).send(user._id);
        } else {
          return res.status(200).send(`login fail, wrong password ${password}`);
        }
      });
    }
  });
};
