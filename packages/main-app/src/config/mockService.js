import { setupWorker } from 'msw';
import ProductService from '../mock/service/product';

const handlers = [...ProductService];

const serverWorker = setupWorker(...handlers)

if(import.meta.env.VITE_PUBLIC_MODE === 'LOCAL'){
    serverWorker.start();
    console.log('%c Mock API Service Worker Active', 'font-size: 12px; font-weight: 700; color: green;')
}

export default serverWorker;