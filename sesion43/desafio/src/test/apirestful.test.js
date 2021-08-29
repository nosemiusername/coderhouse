import request from 'supertest';
import res from 'chai';
import { ItemService } from '../services/itemService';

const urlRequest = request('http://localhost:8080');



describe('test api rest full', () => {
    describe('GET: Obtain Items', () => {
        it('deberia retornar 200', async () => {
            const response = await urlRequest.get('/api/products/');
            res.expect(response.status).to.eql(200);
        })
    });

    describe('GET: Generate Items', () => {
        it('deberia retornar 10 productos mas', async () => {
            const resProductBefore = await urlRequest.get('/api/products/');
            const lengthBefore = resProductBefore.body.length;
            await urlRequest.get('/api/product/generate/10');
            await urlRequest.get('/api/products/');
            const resProductAfter = await urlRequest.get('/api/products/');
            const lengthAfter = resProductAfter.body.length;
            res.expect(lengthAfter).to.equal(lengthBefore + 10);
        });
    });

    describe('PUT: Update Item', () => {
        it('deberia conincidir un la actualización', async () => {
            const response = await urlRequest.get('/api/products/');
            res.expect(response.status).to.eql(200);
        })
    });
})
