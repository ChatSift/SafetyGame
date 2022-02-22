import API from './api';

addEventListener('fetch', (event) => event.respondWith(API.handle(event.request)));
