const MAX_CACHE_SIZE = 10;

// Function to check if cache is full
const isCacheFull = async (redisClient) => {
	const size = await redisClient.sendCommand(["DBSIZE"]);
	return size >= MAX_CACHE_SIZE;
};

// Store a key-value pair
exports.storeCache = async (req, res) => {
	try {
		const {key, value} = req.body;
		const redisClient = req.redisClient;

		if (!key || value === undefined) {
			return res.status(400).json({error: "Key and value are required."});
		}

		const exists = await redisClient.exists(key);
		const cacheFull = await isCacheFull(redisClient);

		if (cacheFull && !exists) {
			return res.status(400).json({error: "Cache limit reached. Cannot store more items."});
		}

		await redisClient.set(key, JSON.stringify(value));
		res.status(201).json({message: "Item stored successfully."});
	} catch (error) {
		res.status(500).json({error: "Internal server error."});
	}
};

// Retrieve a value by key
exports.getCache = async (req, res) => {
	try {
		const {key} = req.params;
		const redisClient = req.redisClient;

		const value = await redisClient.get(key);
		if (value) {
			return res.status(200).json({key, value: JSON.parse(value)});
		}

		res.status(404).json({error: "Key not found in cache."});
	} catch (error) {
		res.status(500).json({error: "Internal server error."});
	}
};

// Remove a key-value pair from the cache
exports.deleteCache = async (req, res) => {
	try {
		const {key} = req.params;
		const redisClient = req.redisClient;

		const result = await redisClient.del(key);
		if (result) {
			return res.status(200).json({message: "Key deleted successfully."});
		}

		res.status(404).json({error: "Key not found in cache."});
	} catch (error) {
		res.status(500).json({error: "Internal server error."});
	}
};
