import axios from "axios"
import Service from './service';

export const HTTPClientNonAuth = () => {
    const client = axios.create({
        baseURL: Service.API,
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        timeout: 120000,
    })

    return client
}