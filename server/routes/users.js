import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateTwitterHandle, updateLinkedInHandle
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);


router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id/:intrets",verifyToken, addRemoveFriend)

router.patch("/:id/twitter", verifyToken, updateTwitterHandle);


router.patch("/:id/linkedin", verifyToken, updateLinkedInHandle);

export default router;
