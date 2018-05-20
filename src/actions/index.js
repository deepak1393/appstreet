import axios from 'axios';

const ROOT_URL = 'https://assignment-appstreet.herokuapp.com/api/v1/products';

export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_PRODUCT = 'fetch_product';

export function fetchProducts(page) {
    const request = axios.get(`${ROOT_URL}?page=${page}`);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}

export function fetchProduct(product_id) {
    const request = axios.get(`${ROOT_URL}/${product_id}`);

    return {
        type: FETCH_PRODUCT,
        payload: request
    };
}