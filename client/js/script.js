import { main, create, update } from './controllers/product.js';

function navigate() {
    const path = window.location.hash.split('/');
    path.shift();

    if (path[0] === undefined || path[0] === '') {
        main();
    } else if (path[0] === 'create') {
        create();
    } else if (path[0] === 'update') {
        update(path[1]);
    }
}
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);
