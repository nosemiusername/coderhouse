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