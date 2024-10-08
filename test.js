const request = require('supertest');
const app = require('./server');  // Importing the app directly

describe('REST API Unit Tests', function() {
    it('should create a new resource', function(done) {
        request(app)
            .post('/resources')
            .send({ id: '1', name: 'Resource 1' })
            .expect(201)
            .expect(res => {
                if (!res.body.id || !res.body.name) throw new Error('Missing resource fields');
            })
            .end(done);
    });

    it('should retrieve all resources', function(done) {
        request(app)
            .get('/resources')
            .expect(200)
            .expect(res => {
                if (!Array.isArray(res.body)) throw new Error('Expected array of resources');
            })
            .end(done);
    });

    it('should update a resource by id', function(done) {
        request(app)
            .put('/resources/1')
            .send({ name: 'Updated Resource 1' })
            .expect(200)
            .expect(res => {
                if (res.body.name !== 'Updated Resource 1') throw new Error('Resource not updated');
            })
            .end(done);
    });

    it('should delete a resource by id', function(done) {
        request(app)
            .delete('/resources/1')
            .expect(200)
            .expect(res => {
                if (!res.text.includes('deleted')) throw new Error('Delete operation failed');
            })
            .end(done);
    });
});
