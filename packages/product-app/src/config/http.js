import axios from "axios"
import Service from './service';

export const HTTPClientNonAuth = () => {
    console.log("🔄 initializing HTTP client for non-authenticated requests");

    const client = axios.create({
        baseURL: Service.API,
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        timeout: 5000,
    })

    return client
}