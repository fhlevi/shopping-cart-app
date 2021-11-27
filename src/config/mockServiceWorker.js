import { setupWorker } from 'msw'
import MockApi from 'Mock/api'

const serviceWorkerApi = setupWorker(...MockApi)

if(process.env.VUE_APP_MODE === 'LOCAL'){
    console.log('%c Mock API Service Worker Active', 'font-size: 12px; font-weight: 700; color: green;')
    
    serviceWorkerApi.start()
}

export default serviceWorkerApi;