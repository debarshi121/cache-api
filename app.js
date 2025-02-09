// Import required modules
const express = require("express");
const {createClient} = require("redis");
const dotenv = require("dotenv");
const cacheRoutes = require("./routes/cacheRoutes");
const app = express();
const PORT = process.env.PORT || 8000;

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Redis client setup
const redisClient = createClient({
	url: process.env.REDIS_URL,
});

redisClient.connect().catch((err) => {
	console.error("Failed to connect to Redis:", err);
	process.exit(1); // Exit if Redis connection fails
});

// Make Redis client available in routes
app.use((req, res, next) => {
	req.redisClient = redisClient;
	next();
});

// Use cache routes
app.use("/api/v1/cache", cacheRoutes);

// Handle 404 errors
app.use((req, res) => {
	res.status(404).json({error: "Endpoint not found"});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
