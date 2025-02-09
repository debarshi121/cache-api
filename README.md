
# Cache API

Cache API is a simple RESTful API built with Node.js, Express, and Redis. It allows you to store, retrieve, and delete key-value pairs in a Redis cache. The API also ensures that the cache size does not exceed a specified limit.

## Features

- Store key-value pairs in Redis
- Retrieve values by key
- Delete key-value pairs
- Limit the cache size to a maximum number of items

## Prerequisites

- Node.js
- Redis

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/debarshi121/cache-api.git
   cd cache-api
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Create a .env file in the root directory and add your Redis URL:
	```
	REDIS_URL="your_redis_url"
	  ```

## Usage

1. Start the server:
   ```
   npm run dev
   ```
2. The server will be running on **http://localhost:8000**.


## API Endpoints

### Store a key-value pair

-   **URL:**  `/api/v1/cache`
-   **Method:**  `POST`
-   **Body:**
    
    ```javascript
    {
	    "key": "your_key",
	    "value": "your_value"
    }
    ```
    
-   **Response:**
    -   `201 Created`  if the item is stored successfully
    -   `400 Bad Request`  if the key or value is missing, or if the cache limit is reached
    -   `500 Internal Server Error`  if there is a server error

### Retrieve a value by key

-   **URL:**  `/api/v1/cache/:key`
-   **Method:**  `GET`
-   **Response:**
    -   `200 OK`  with the key-value pair if found
    -   `404 Not Found`  if the key is not found in the cache
    -   `500 Internal Server Error`  if there is a server error

### Delete a key-value pair

-   **URL:**  `/api/v1/cache/:key`
-   **Method:**  `DELETE`
-   **Response:**
    -   `200 OK`  if the key is deleted successfully
    -   `404 Not Found`  if the key is not found in the cache
    -   `500 Internal Server Error`  if there is a server error

## License

This project is licensed under the MIT License.
