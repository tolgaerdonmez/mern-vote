import expressJwt from "express-jwt";
import config from "../config";

export const jwt = expressJwt({ secret: config.jwtSecret, userProperty: "auth" });

export const hasAuthorization = (req, res, next) => {
	const userId = req.profile ? req.profile._id : req.body.user;
	const authorized = userId && req.auth && userId == req.auth._id;
	if (!authorized) {
		return res.status(403).json({
			error: "User is not authorized!",
		});
	}
	next();
};
