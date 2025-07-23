import { HTTPClientNonAuth } from '../config/http';

const prefix = 'product-list'

export const getListProduct = () => {
    console.log("🔄 fetching product list");
    return HTTPClientNonAuth().get(prefix);
};