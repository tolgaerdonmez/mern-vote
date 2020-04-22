import { Router } from "express";
import User from "../models/user";
import { jwt, hasAuthorization } from "../middlewares/auth";
const router = Router();

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
	.get(jwt, hasAuthorization, (req, res) => {
		req.profile.hashedPassword = undefined;
		req.profile.salt = undefined;
		return res.json(req.profile);
	})
	.delete(jwt, hasAuthorization, (req, res, next) => {
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
