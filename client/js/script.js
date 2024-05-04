import Product from './models/Product.js';
import { showMain, showCreate, showUpdate } from './views/product.js';

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

// Fonction qui affiche la page d'accueil
async function main() {
    try {
        const product = new Product();
        const response = await product.readAll();
        const products = response.products;

        showMain(products);

        const btnDelete = document.getElementsByClassName('delete');
        for (let i = 0; i < btnDelete.length; i++) {
            const btn = document.getElementById(btnDelete[i].id);
            btn.addEventListener('click', async () => {
                if (confirm('Supprimer ce produit ?')) {
                    try {
                        const product = new Product();
                        product.setId(btn.dataset.id);
                        const response = await product.delete();
                        if (response.error) {
                            console.error(response.error);
                        } else {
                            console.log(response.message);

                            window.location.href = '#/';
                            navigate();
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// Fonction qui affiche le formulaire d'ajout
function create() {
    showCreate();

    const btnCreate = document.getElementById('btn-create');
    btnCreate.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            const product = new Product();
            product.setName(document.getElementById('name').value);
            product.setPrice(document.getElementById('price').value);
            product.setQuantity(document.getElementById('quantity').value);
            const response = await product.create();

            if (response.error) {
                console.error(response.error);
            } else {
                console.log(response.message);

                window.location.href = '#/';
            }
        } catch (error) {
            console.error(error);
        }
    });
}

// Fonction qui affiche le formulaire de modification
async function update(id) {
    try {
        const product = new Product();
        product.setId(id);
        const response = await product.readOne();
        product.setName(response.product.name);
        product.setPrice(response.product.price);
        product.setQuantity(response.product.quantity);

        showUpdate(product);

        const btnUpdate = document.getElementById('btn-update');
        btnUpdate.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const product = new Product();
                product.setId(id);
                product.setName(document.getElementById('name').value);
                product.setPrice(document.getElementById('price').value);
                product.setQuantity(document.getElementById('quantity').value);
                const response = await product.update();

                if (response.error) {
                    console.error(response.error);
                } else {
                    console.log(response.message);

                    window.location.href = '#/';
                }
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
}
