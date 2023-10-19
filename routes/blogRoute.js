import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getBlogByUserId,
} from "../controllers/blogController.js";
const router = express.Router();

router.get("/allblogs/", getAllBlogs);
router.get("/getblog/:id", getBlogById);
router.post("/addblog", addBlog);
router.put("/updateblog/:id", updateBlog);
router.delete("/deleteblog/:id", deleteBlog);
router.get("/user/:id", getBlogByUserId);

export default router;
