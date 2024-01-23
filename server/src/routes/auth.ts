import { Router } from "express";
import {
	getProfile,
	gusetLogin,
	login,
	logout,
	register,
} from "../controllers/auth";
import { authenticateUser } from "../middlewares/authentication";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/guest-login").get(gusetLogin);
router.route("/logout").get(authenticateUser, logout);
router.route("/me").get(authenticateUser, getProfile);

export default router;