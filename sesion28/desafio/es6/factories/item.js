import faker from 'faker';
faker.locale = 'es';

export const getItem = () => ({
    nombre: faker.commerce.productName(),
    categoria: faker.commerce.department(),
    stock: Math.floor(Math.random()* 255),
})