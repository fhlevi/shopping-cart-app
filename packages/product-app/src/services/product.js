import { HTTPClientNonAuth } from '../config/http';

const prefix = 'product-list'

export const getListProduct = () => {
    return HTTPClientNonAuth().get(prefix);
};