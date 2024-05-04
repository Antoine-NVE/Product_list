import Product from './models/Product.js';

const container = document.getElementById('container');

function navigate() {
    const path = window.location.hash.split('/');
    path.shift();

    if (path[0] === undefined || path[0] === '') {
        showMain();
    } else if (path[0] === 'create') {
        showCreate();
    } else if (path[0] === 'update') {
        showUpdate(path[1]);
    }
}
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);

// Fonction qui affiche la page d'accueil
async function showMain() {
    try {
        const product = new Product();
        const response = await product.readAll();
        const products = response.products;

        let body = '';
        for (let i = 0; i < products.length; i++) {
            // prettier-ignore
            body += `
                <tr>
                    <td>${products[i].name}</td>
                    <td>${products[i].price / 100} €</td>
                    <td>${products[i].quantity}</td>
                    <td>
                        <a href="#/update/${products[i]._id}" id="update-${i + 1}" class="btn btn-warning update" data-id="${products[i]._id}">
                            Modifier
                        </a>
                        <button id="delete-${i + 1}" class="btn btn-danger delete" data-id="${products[i]._id}">
                            Supprimer
                        </button>
                    </td>
                </tr>
            `;
        }

        container.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${body}
                    <tr>
                        <td colspan="4"><a href="#/create" class="btn btn-primary w-100">Ajouter un produit</a></td>
                    </tr>
                </tbody
            </table>
        `;

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
function showCreate() {
    container.innerHTML = `
        <a href="#/" class="btn btn-primary mb-3">Accueil</a>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Nom</label>
                <input type="text" class="form-control" id="name">
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Prix (€)</label>
                <input type="number" class="form-control" id="price">
            </div>
            <div class="mb-3">
                <label for="quantity" class="form-label">Quantité</label>
                <input type="number" class="form-control" id="quantity">
            </div>
            <button id="btn-create" class="btn btn-primary">Valider</button>
        </form>
    `;

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
async function showUpdate(id) {
    try {
        const product = new Product();
        product.setId(id);
        const response = await product.readOne();
        product.setName(response.product.name);
        product.setPrice(response.product.price);
        product.setQuantity(response.product.quantity);

        // prettier-ignore
        container.innerHTML = `
            <a href="#/" class="btn btn-primary mb-3">Accueil</a>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" class="form-control" id="name" value="${product.getName()}">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Prix (€)</label>
                    <input type="number" class="form-control" id="price" value="${product.getPrice() / 100}">
                </div>
                <div class="mb-3">
                    <label for="quantity" class="form-label">Quantité</label>
                    <input type="number" class="form-control" id="quantity" value="${product.getQuantity()}">
                </div>
                <button id="btn-update" class="btn btn-primary">Valider</button>
            </form>
        `;

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
