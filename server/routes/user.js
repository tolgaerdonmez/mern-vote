import { Router } from "express";
import expressJwt from "express-jwt";
import User from "../models/user";
import config from "../config";

const router = Router();

const requireSignIn = expressJwt({ secret: config.jwtSecret, userProperty: "auth" });

const hasAuthorization = (req, res, next) => {
	const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!authorized) {
		return res.status(403).json({
			error: "User is not authorized!",
		});
	}
	next();
};

router.route("/api/users").post((req, res) => {
	const user = new User(req.body);
	user.save((err, result) => {
		if (err) {
			return res.status(400).json({ error: "Cannot register new user !" });
		}
		return res.status(201).json({ message: "New user created!" });
	});
});

router
	.route("/api/users/:userId")
	.get(requireSignIn, hasAuthorization, (req, res) => {
		req.profile.hashedPassword = undefined;
		req.profile.salt = undefined;
		return res.json(req.profile);
	})
	.delete(requireSignIn, hasAuthorization, (req, res, next) => {
		let user = req.profile;
		user.remove((err, deletedUser) => {
			if (err) {
				return res.status(400).json({
					error: "Cannot delete user",
				});
			}
			deletedUser.hashedPassword = undefined;
			deletedUser.salt = undefined;
			res.json(deletedUser);
		});
	});

router.param("userId", (req, res, next, userId) => {
	User.findById(userId).exec((err, user) => {
		if (err || !user) {
			res.status(400).json({ error: "User not found!" });
		}
		req.profile = user;
		next();
	});
});

export default router;
