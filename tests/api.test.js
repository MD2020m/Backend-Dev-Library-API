const request = require('supertest');
const app = require('../server');

describe('Books API', () => {
    test('should return all books', async () => {
        const response = await request(app).get('/books');

        expect(response.status).toBe(200);

        expect(response.body).toHaveLength(3);
    });

    test('should return book by ID', async () => {
        const response = await request(app).get('/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
    });

    test('should not find resource for nonexistent ID', async () => {
        const response = await request(app).get('/books/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should create a new book', async () => {
        const newBook = {
            title: "Anne of Greene Gables",
            author: "L.M. Montgomery",
            genre: "Fiction",
            copiesAvailable: 4
        };

        const response = await request(app)
            .post('/books')
            .send(newBook);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Anne of Greene Gables');
    });

    test('should update existing book', async () => {
        const updatedBook = {
            title: "Anne of Avonlea",
            author: "L.M. Montgomery",
            genre: "Fiction",
            copiesAvailable: 4
        }

        const response = await request(app)
            .put('/books/1')
            .send(updatedBook);
        
        expect(response.status).toBe(200);
        expect(response.body.genre).toBe('Fiction');
    });

    test('should not update resource with nonexistent ID', async () => {
        const updatedBook = {
            title: "Anne of Avonlea",
            author: "L.M. Montgomery",
            genre: "Fiction",
            copiesAvailable: 4
        }

        const response = await request(app)
            .put('/books/999')
            .send(updatedBook);

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error');
    });

    test('should delete existing book', async () => {
        const response = await request(app).delete('/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    test('should not delete resource with nonexistent ID', async () => {
        const response = await request(app).delete('/books/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }) ;
});