import AxiosREST from 'axios';

class User {
    constructor(header = {}) {
        this.Axios = AxiosREST.create({
            baseURL: "https://jsonplaceholder.typicode.com",
            header: {
                'Content-Type': (header.contentType)? header.contentType : 'application/json'
            }
        })
    }
    getListUser() {
        return this.Axios.get('/users');
    }
    getListPhotoUser() {
        return this.Axios.get('/albums/1/photos');
    }
}

export default User;