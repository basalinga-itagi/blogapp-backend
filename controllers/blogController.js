import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
export const getAllBlogs = async (req, res, next) => {
  console.log("req.query.category", req.query.category);
  try {
    let blogs;
    if (!req.query.category) {
      blogs = await Blog.find({}).populate("user");
    } else {
      blogs = await Blog.find({ tagtype: req.query.category }).populate("user");
    }

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).send("Error while fetching all blogs");
  }
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, tagtype, user } = req.body;
  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      res.status(500).send("User not found");
    }
    const newBlog = new Blog({
      title,
      description,
      image,
      tagtype,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    res.status(200).json(newBlog);
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.log("err", err);
    res.status(500).json(err);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(400).send("No Blog Found");
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id).populate(
      "user"
    );
    await deletedBlog.user.blogs.pull(deletedBlog);
    await deletedBlog.user.save();
    res.status(200).send("Blog is deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getBlogByUserId = async (req, res, next) => {
  try {
    const userBlogs = await User.findById(req.params.id).populate("blogs");
    if (!userBlogs) {
      res.status(400).send("blogs not found");
    }
    res.status(200).json(userBlogs);
  } catch (err) {
    res.status(500).send(err);
  }
};
