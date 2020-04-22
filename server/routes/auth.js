import { Router } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";

const router = Router();

router.route("/auth/signin").post((req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err || !user) {
			return res.status(401).json({
				error: "User not found",
			});
		}
		if (!user.authenticate(req.body.password)) {
			return res.status(401).json({
				error: "Wrong Email or Password!!",
			});
		}

		const token = jwt.sign({ _id: user._id }, config.jwtSecret);

		res.cookie("t", token, {
			expire: new Date() + 3600,
		});

		return res.json({
			token,
			id: user._id,
		});
	});
});

router.route("/auth/signout").get((req, res) => {
	res.clearCookie("t");
	return res.status(200).json({
		message: "Sign out successful!",
	});
});

export default router;
