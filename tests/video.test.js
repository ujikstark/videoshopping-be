const request = require('supertest');
const app = require('../index');


// Import your models (Video, Product, Comment) and the User model for seeding data
const Video = require('../models/video');
const Product = require('../models/product');
const Comment = require('../models/comment');
const User = require('../models/user');

// random value just for testing
const userId = '6152f0f5a7b6d3f582ed85d4';

beforeAll(async () => {
    await Comment.deleteMany();
    await Product.deleteMany();
    await Video.deleteMany();
    await User.deleteMany();

    await User.create({ _id: userId, name: 'Test User', photoUrl: 'https://example.com/test-user.jpg' });

});

let videoId = '';
describe('POST /videos', () => {
    it('should create a new video', async () => {
        const newVideo = {
            title: 'Video 1',
            thumbnailImageUrl: 'https://example.com/video1.jpg',
            userId: userId
        };
        const response = await request(app).post('/api/videos').send(newVideo);
        videoId = response.body._id; 
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe(newVideo.title);
        expect(response.body.thumbnailImageUrl).toBe(newVideo.thumbnailImageUrl);
        expect(response.body.userId).toBe(newVideo.userId);
    });
});


describe('GET /videos', () => {
    it('should get a list of all videos', async () => {
        const response = await request(app).get('/api/videos');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});


describe('GET /videos/:id', () => {
    it('should get a specific video by its ID', async () => {
        const response = await request(app).get('/api/videos/'+videoId);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', videoId);
        expect(response.body).toHaveProperty('title', 'Video 1');
        expect(response.body).toHaveProperty('thumbnailImageUrl', 'https://example.com/video1.jpg');
        expect(response.body).toHaveProperty('userId', userId);
    });

    it('should return 404 if the video is not found', async () => {
        const response = await request(app).get('/api/videos/'+userId);
        expect(response.status).toBe(404);
        // expect(response.body).toHaveProperty('message', 'Video not found');
    });

    it('should return 500 if the parameter videoId is not valid', async () => {
        const response = await request(app).get('/api/videos/nonexistent-video-id');
        expect(response.status).toBe(500);
        // expect(response.body).toHaveProperty('message', 'Video not found');
    });
});

let productId = '';
describe('POST /products', () => {
    it('should create a new product', async () => {
        const newProduct = {
            title: 'Product 1',
            productUrl: "http://example.com/product1",
            price: 20000,
            videoId: videoId
        };
        const response = await request(app).post('/api/products').send(newProduct);
        productId = response.body._id; 
        expect(response.status).toBe(201);
       
    });
});
describe('GET /videos/:videoId/products', () => {
    console.log(videoId);
    it('should get products associated with a specific video', async () => {
        const response = await request(app).get(`/api/videos/${videoId}/products`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // Add more assertions as needed for the products
    });

    it('should return 500 if the parameter videoId is not valid', async () => {
        const videoWrongId = 'nonexistent-video-id';
        const response = await request(app).get(`/api/videos/${videoWrongId}/products`);
        expect(response.status).toBe(500);
    });

    it('should return 404 if no products are found for the video', async () => {
        const videoWrongId = userId;
        const response = await request(app).get(`/api/videos/${videoWrongId}/products`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Products not found for this video');
    });
});

describe('POST /comments', () => {
    it('should create a new comments', async () => {
        const newComment = {
            username: 'bro',
            comment: 'Great Video',
            videoId: videoId,
        };
        const response = await request(app).post('/api/comments').send(newComment);
        expect(response.status).toBe(201);
       
    });
});

describe('GET /videos/:videoId/comments', () => {
    it('should get comments associated with a specific video', async () => {
        const response = await request(app).get(`/api/videos/${videoId}/comments`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // Add more assertions as needed for the comments
    });

});




