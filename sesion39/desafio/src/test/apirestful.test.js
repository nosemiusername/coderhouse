import request from 'supertest';
import res from 'chai';

const urlRequest = request('http://localhost:8080');

describe('test api rest full', () => {
    describe('GET Item', () => {
        it('deberia retornar 200', async () => {
            const response = await urlRequest.get('/api/products/');
            res.expect(response.status).to.eql(200);
        })
    });
    describe('Create Item', () => {
        it('deberia ', async () => {
            const resProductBefore = await urlRequest.get('/api/products/');
            const lengthBefore = resProductBefore.body.length;
            await urlRequest.get('/api/product/generate/1');
            await urlRequest.get('/api/products/');
            const resProductAfter = await urlRequest.get('/api/products/');
            const lengthAfter = resProductAfter.body.length;
            res.expect(lengthAfter).to.equal(lengthBefore + 1);
        });
    });
})
