import express from "express";
import {
  getAllUsers,
  signUp,
  login,
  getUserById,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/allusers/", getAllUsers);
router.get("/finduser/:id", getUserById);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
