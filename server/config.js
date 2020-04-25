require("dotenv").config();

const config = {
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	mongoURI: process.env.DB_URL,
	host: process.env.HOST || "localhost",
};

export default config;
