import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Error while fetching all user");
  }
};

export const getUserById = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Error while fetching single user");
  }
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send("User is already registered");
    } else {
      const hashPassword = bcrypt.hashSync(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        blogs: [],
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).send("User not exist");
    }
    const isCrtPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isCrtPassword) {
      res.status(400).send("Inavalid credentials");
    }
    console.log("existingUser", existingUser);
    res.status(200).json(existingUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
