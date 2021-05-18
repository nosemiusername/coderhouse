import axios from 'axios';
import { Product } from '../model/product';
import { ProductList } from '../model/productList';

export const calculateCart = (cart: ProductList): any => {
    const sum = cart.list.map(element => element.price)
        .reduce((accum: number, actual: number) => accum + actual, 0);

    return {
        sum: sum,
        length: cart.getSize(),
        ...
        cart
    }
}

export const obtainProducts = async () => {
    const products = await axios({
        method: 'get',
        url: 'https://exciting-efficient-roquefort.glitch.me/api/productos',
        headers: {
            'auth-token': '123456'
        }
    });

    return products;
}

export const obtainProductById = async (idProduct:number) => {
    console.log(`https://exciting-efficient-roquefort.glitch.me/api/productos/${idProduct}/show`); 
    const products = await axios({
        method: 'get',
        url: `https://exciting-efficient-roquefort.glitch.me/api/productos/${idProduct}/show`,
        headers: {
            'auth-token': '123456'
        }
    });

    return products;
}