// babel imports
import "core-js/stable";
import "regenerator-runtime/runtime";
// normal imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import pollRoutes from "./routes/polls";

const app = express();

mongoose.connect(config.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

// When successfully connected
mongoose.connection.on("connected", () => {
	console.log("Established Mongoose Default Connection");
});

// When connection throws an error
mongoose.connection.on("error", err => {
	console.log("Mongoose Default Connection Error : " + err);
});

// middleware functions
app.use(cors());
app.use(express.static(__dirname + "/../client/build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", pollRoutes);

app.get("/*", (req, res) => {
	const options = {
		root: `${__dirname}/../client/build/`,
		dotfiles: "deny",
	};
	res.sendFile("index.html", options);
});

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({ error: err.name + ":" + err.message });
	}
});

app.listen(config.port, config.host, () => {
	console.log(`🚀 at port ${config.port}`);
});
