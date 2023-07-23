# Backend Video Shopping

This Repository specially for Backend Video Shopping Project (Mid Term Project Generasi Gigih 3.0) 

## API Structure

This README provides a comprehensive explanation of the API structure for our application, implemented using Express.js and Mongoose. The API offers endpoints for managing users, videos, products, and comments. allowing users to perform CRUD operations efficiently.

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Database Structure](#database-structure)
4. [API Endpoints](#api-endpoints)
    - [1. GET /users](#1-get-users)
    - [2. POST /users](#2-post-users)
    - [3. GET /users/:id](#3-get-usersid)
    - [4. GET /videos](#4-get-videos)
    - [5. POST /videos](#5-post-videos)
    - [6. GET /videos/:id](#6-get-videosid)
    - [7. GET /videos/:videoId/products](#7-get-products-by-videoid)
    - [8. GET /videos/:videoId/comments](#7-get-comments-by-videoid)    
    - [9. POST /products](#7-post-products)
    - [10. POST /comments](#8-post-comments)
5. [Error Handling](#error-handling)
6. [Usage Examples](#usage-examples)
7. [Conclusion](#conclusion)

### Prerequisites

Before running the API, ensure you have the following installed:

- Node.js (v12 or above)
- MongoDB (configured and running)
- npm (Node Package Manager)

### Getting Started

To set up and run the API, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Configure the MongoDB connection URL in .env
4. Start your MongoDB server and make sure it is running.
5. Run the API using `npm start` or Run the test using `npm test`.


## Database Structure

The API utilizes MongoDB as the database. It consists of three main schemas:

### User Schema

The `userSchema` represents users in the system. Each user is associated with a unique `_id`, represented as a `String` type. The schema includes the following properties:

- **_id**: A unique identifier for the user (String).
- **name**: The name of the user (String, required).
- **photoUrl**: The URL of the user's profile photo (String).

Example:

```json
{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "name": "John Doe",
  "photoUrl": "https://example.com/john-doe.jpg"
}
```

### Video Schema

The `videoSchema` represents videos associated with users in the system. Each video is associated with a unique `_id`, represented as a `String` type. The schema includes the following properties:

- **_id**: A unique identifier for the video (String).
- **title**: The title of the video (String, required).
- **thumbnailImageUrl**: The URL of the video's thumbnail image (String, required).
- **userId**: The `_id` of the user who created the video (Reference to `User`, required).

Example:

```json
{
  "_id": "6152f0f5a7b6d3f582ed85d0",
  "title": "Video 1",
  "thumbnailImageUrl": "https://example.com/video1.jpg",
  "userId": "6152f0f5a7b6d3f582ed85da"
}
```

### Product Schema

The `productSchema` represents products associated with videos. Each product is associated with a unique `_id`, represented as a `String` type. The schema includes the following properties:

- **_id**: A unique identifier for the product (String).
- **productUrl**: The URL of the product (String, required).
- **title**: The title of the product (String, required).
- **price**: The price of the product (Number, required).
- **videoId**: The `_id` of the video to which the product is associated (Reference to `Video`).

Example:

```json
{
  "_id": "6152f0f5a7b6d3f582ed85d5",
  "productUrl": "https://example.com/product1",
  "title": "Product 1",
  "price": 20000,
  "videoId": "6152f0f5a7b6d3f582ed85d0"
}
```

### Comment Schema

The `commentSchema` represents comments associated with videos. Each comment is associated with a unique `_id`, represented as a `String` type. The schema includes the following properties:

- **_id**: A unique identifier for the comment (String).
- **username**: The username of the commenter (String, required).
- **comment**: The comment text (String, required).
- **videoId**: The `_id` of the video to which the comment is associated (Reference to `Video`).

Example:

```json
{
  "_id": "6152f0f5a7b6d3f582ed85d8",
  "username": "user1",
  "comment": "Great video!",
  "videoId": "6152f0f5a7b6d3f582ed85d0",
  "createdAt": "2023-10-02T12:34:56.789Z"
}
```

These schemas define the structure of the data stored in the MongoDB database. The `videoSchema`, `productSchema`, and `commentSchema` are interconnected through the `videoId` property, creating a relational structure to efficiently manage videos, products, and comments in the API.

### API Endpoints

The API offers the following endpoints for managing users, videos, products, and comments:

### 1. GET /users

- **Description**: This endpoint retrieves a list of all users available in the database.

- **HTTP Method**: GET

- **Response**: The response will be an array of user objects, each containing `_id`, `name`, and `photoUrl`.

- **Example Response**:
```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "_id": "6152f0f5a7b6d3f582ed85da",
    "name": "John Doe",
    "photoUrl": "https://example.com/john-doe.jpg"
  },
  {
    "_id": "6152f0f5a7b6d3f582ed85db",
    "name": "Jane Smith",
    "photoUrl": "https://example.com/jane-smith.jpg"
  },
  // More users...
]
```

### 2. POST /users

- **Description**: This endpoint allows creating a new user in the system.

- **HTTP Method**: POST

- **Request Body**: The request body should include the following properties:
  - `name` (required): The name of the user (String).
  - `photoUrl`: The URL of the user's profile photo (String).

- **Response**: The response will be the newly created user object, including its assigned `_id`.

- **Example Request**:
```json
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "photoUrl": "https://example.com/john-doe.jpg"
}
```

- **Example Response**:
```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "name": "John Doe",
  "photoUrl": "https://example.com/john-doe.jpg"
}
```

### 3. GET /users/:id

- **Description**: This endpoint retrieves a specific user by their unique ID.

- **HTTP Method**: GET

- **URL Parameter**: The `id` parameter in the URL represents the `_id` of the user to retrieve.

- **Response**: The response will be the user object with the matching ID, including `_id`, `name`, and `photoUrl`.

- **Example Request**: GET /users/6152f0f5a7b6d3f582ed85da

- **Example Response**:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "name": "John Doe",
  "photoUrl": "https://example.com/john-doe.jpg"
}
```

### 4. GET /videos

- **Description**: This endpoint retrieves a list of all videos available in the database.

- **HTTP Method**: GET

- **Response**: The response will be an array of video objects, each containing `title`, `userId`, and `thumbnailImageUrl`.

- **Example Response**:
```json
[
  {
    "_id": "6152f0f5a7b6d3f582ed85d0",
    "title": "Video 1",
    "userId": "6152f0f5a7b6d3f582ed85da",
    "thumbnailImageUrl": "https://example.com/video1.jpg",
  },
  {
    "_id": "6152f0f5a7b6d3f582ed85d1",
    "title": "Video 2",
    "userId": "6152f0f5a7b6d3f582ed85da",
    "thumbnailImageUrl": "https://example.com/video2.jpg"
  },
  // More videos...
]
```

### 5. POST /videos

- **Description**: This endpoint allows creating a new video associated with a user.

- **HTTP Method**: POST

- **Request Body**: The request body should include the following properties:
  - `title` (required): The title of the video (String).
  - `thumbnailImageUrl` (required): The URL of the video's thumbnail image (String).
  - `userId` (required): The `_id` of the user who created the video (String).

- **Response**: The response will be the newly created video object, including its assigned `_id`.

- **Example Request**:
```json
{
  "title": "New Video",
  "thumbnailImageUrl": "https://example.com/new-video.jpg",
  "userId": "6152f0f5a7b6d3f582ed85da"
}
```

- **Example Response**:
```json
{
  "_id": "6152f0f5a7b6d3f582ed85d2",
  "title": "New Video",
  "thumbnailImageUrl": "https://example.com/new-video.jpg",
  "userId": "6152f0f5a7b6d3f582ed85da"
}
```

### 6. GET /videos/:id

- **Description**: This endpoint retrieves the details of a specific video, along with its associated products and comments, based on the provided video ID.

- **HTTP Method**: GET

- **Parameters**: `:id` should be replaced with the `_id` of the video you want to fetch.

- **Response**: The response will be the video object with the matching ID, including title, thumbnailImageUrl, userId, products, and comments.

- **Example Response**:
```json
{
  "_id": "6152f0f5a7b6d3f582ed85d2",
  "title": "New Video",
  "thumbnailImageUrl": "https://example.com/new_video.jpg",
  "userId": "6152f0f5a7b6d3f582ed85da",
  "products": [
    {
      "_id": "6152f0f5a7b6d3f582ed85d5",
      "productUrl": "https://example.com/product1",
      "title": "Product 1",
      "price": 100000
    },
    {
      "_id": "6152f0f5a7b6d3f582ed85d6",
      "productUrl": "https://example.com/product2",
      "title": "Product 2",
      "price": 29999
    }
  ],
  "comments": [
    {
      "_id": "6152f0f5a7b6d3f582ed85d8",
      "username": "user1",
      "comment": "Great video!"
    },
    {
      "_id": "6152f0f5a7b6d3f582ed85d9",
      "username": "user2",
      "comment": "Awesome content!"
    }
  ]
}
```


### 7. GET /videos/:videoId/products

- **Description**: This endpoint retrieves the products associated with a specific video identified by `:videoId`.

- **HTTP Method**: GET

- **URL Parameters**:
  - `:videoId` (required): The unique identifier (ID) of the video for which you want to retrieve the associated products.

- **Response**: The response will be an array of product objects, each containing information about the product.

- **Example Response**:
```json
[
  {
    "_id": "6152f0f5a7b6d3f582ed85e0",
    "productUrl": "https://example.com/product1",
    "title": "Product 1",
    "price": 200023,
    "videoId": "6152f0f5a7b6d3f582ed85d0"
  },
  {
    "_id": "6152f0f5a7b6d3f582ed85e1",
    "productUrl": "https://example.com/product2",
    "title": "Product 2",
    "price": 22331,
    "videoId": "6152f0f5a7b6d3f582ed85d0"
  },
  // More products associated with the video...
]
```

### 8. GET /videos/:videoId/comments

- **Description**: This endpoint retrieves the comments associated with a specific video identified by `:videoId`.

- **HTTP Method**: GET

- **URL Parameters**:
  - `:videoId` (required): The unique identifier (ID) of the video for which you want to retrieve the associated comments.

- **Response**: The response will be an array of comment objects, each containing information about the comment.

- **Example Response**:
```json
[
  {
    "_id": "6152f0f5a7b6d3f582ed85c0",
    "username": "User1",
    "comment": "This video is awesome!",
    "videoId": "6152f0f5a7b6d3f582ed85d0",
    "createdAt": "2023-07-21T12:34:56.789Z",
    "updatedAt": "2023-07-21T12:34:56.789Z"
  },
  {
    "_id": "6152f0f5a7b6d3f582ed85c1",
    "username": "User2",
    "comment": "Great content!",
    "videoId": "6152f0f5a7b6d3f582ed85d0",
    "createdAt": "2023-07-21T12:35:12.345Z",
    "updatedAt": "2023-07-21T12:35:12.345Z"
  },
  // More comments associated with the video...
]
```


### 9. POST /products

- **Description**: This endpoint allows the creation of a new product associated with a specific video.

- **HTTP Method**: POST

- **Request Body**: The request body should include the following properties:
  - `productUrl` (required): The URL of the product.
  - `title` (required): The title of the product.
  - `price` (required): The price of the product.
  - `videoId` (required): The `_id` of the video to which the product is associated.

- **Example Request**:
```json
{
  "productUrl": "https://example.com/product3",
  "title": "Product 3",
  "price": 40900,
  "videoId": "6152f0f5a7b6d3f582ed85d2"
}
```

- **Response**: The response will be the newly created product object, including its assigned `_id`.

- **Example Response**:
```json
{
  "_id": "6152f0f5a7b6d3f582ed85da",
  "productUrl": "https://example.com/product3",
  "title": "Product 3",
  "price": 24000,
  "videoId": "6152f0f5a7b6d3f582ed85d2"
}
```

### 10. POST /comments

- **Description**: This endpoint allows the creation of a new comment associated with a specific video.

- **HTTP Method**: POST

- **Request Body**: The request body should include the following properties:
  - `username` (required): The username of the commenter.
  - `comment` (required): The comment text.
  - `videoId` (required): The `_id` of the video to which the comment is associated.

- **Example Request**:
```json
{
  "username": "user3",
  "comment": "Nice video!",
  "videoId": "6152f0f5a7b6d3f582ed85d2"
}
```

- **Response**: The response will be the newly created comment object, including its assigned `_id`.

- **Example Response**:
```json
{
  "_id": "6152f0f5a7b6d3f582ed85db",
  "username": "user3",
  "comment": "Nice video!",
  "videoId": "6152f0f5a7b6d3f582ed85d2",
  "createdAt": "2023-10-02T12:34:56.789Z"
}
```

Please note that the examples provided above are for illustrative purposes and the actual data may vary depending on your specific application and database. Also, ensure to replace `'DATABASE_URL'` with the actual URL to your MongoDB server.
...

### Error Handling

The API includes error handling for various scenarios, such as invalid requests, database errors, and not found responses. Errors are returned in JSON format with appropriate status codes and error messages.

### Usage Examples

Here are some examples of how to use the API:

1. To retrieve all users: Send a GET request to /users.
2. To retrieve a specific user by ID: Send a GET request to /users/:id, replacing :id with the user ID.
3. To create a new user: Send a POST request to `/users` with the required details in the request body.
4. To retrieve all videos: Send a GET request to `/videos`.
5. To create a new video: Send a POST request to `/videos` with the required details in the request body.
6. To retrieve the details of a video with associated products and comments: Send a GET request to `/videos/:id`, replacing `:id` with the video ID.
7. To retrieve the products associated with a specific video: Send a GET request to /videos/:videoId/products, replacing :videoId with the video ID.
8. To retrieve the comments associated with a specific video: Send a GET request to /videos/:videoId/comments, replacing :videoId with the video ID.
9. To create a new product associated with a video: Send a POST request to `/products` with the required product details in the request body, including the `videoId`.
10. To create a new comment associated with a video: Send a POST request to `/comments` with the required comment details in the request body, including the `videoId`.

### Conclusion

The API structure provided in this README allows seamless interaction with videos, products, and comments in your application. The defined endpoints facilitate data retrieval, creation, and updates for each resource, providing a robust and efficient backend for your frontend application.

For detailed implementation and code samples, please refer to the project files and the respective API route handlers in the server code.