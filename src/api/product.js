import AxiosREST from 'axios';

class Product {
    constructor(header = {}) {
        this.Axios = AxiosREST.create({
            baseURL: process.env.VUE_APP_API_MOCK,
            header: {
                'Content-Type': (header.contentType)? header.contentType : 'application/json'
            }
        })
    }
    getListUser() {
        return this.Axios.get('/product-list');
    }
    getListPhotoUser() {
        return this.Axios.get('/albums/1/photos');
    }
}

export default Product;