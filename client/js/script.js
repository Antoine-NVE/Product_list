const container = document.getElementById('container');

// Fonction qui affiche la page d'accueil
function showMain() {
    fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((response) => {
            products = response.products;
            let body = '';
            for (let i = 0; i < products.length; i++) {
                // prettier-ignore
                body += `
                    <tr>
                        <td>${products[i].name}</td>
                        <td>${products[i].price / 100} €</td>
                        <td>${products[i].quantity}</td>
                        <td>
                            <button id="update-${i + 1}" class="btn btn-warning update" data-id="${products[i]._id}">
                                Modifier
                            </button>
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
                            <td colspan="4"><button id="btn-add" class="btn btn-primary w-100">Ajouter un produit</button></td>
                        </tr>
                    </tbody
                </table>
            `;

            const btnUpdate = document.getElementsByClassName('update');
            for (let i = 0; i < btnUpdate.length; i++) {
                const btn = document.getElementById(btnUpdate[i].id);
                btn.addEventListener('click', () => {
                    showUpdate(btn.dataset.id);
                });
            }

            const btnDelete = document.getElementsByClassName('delete');
            for (let i = 0; i < btnDelete.length; i++) {
                const btn = document.getElementById(btnDelete[i].id);
                btn.addEventListener('click', () => {
                    if (confirm('Supprimer ce produit ?')) {
                        fetch(
                            `http://localhost:3000/api/products/${btn.dataset.id}`,
                            {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                            .then((response) => response.json())
                            .then((response) => {
                                if (response.error) {
                                    console.error(response.error);
                                } else {
                                    console.log(response.message);
                                    showMain();
                                }
                            })
                            .catch((error) => console.error(error));
                    }
                });
            }

            const btnAdd = document.getElementById('btn-add');
            btnAdd.addEventListener('click', () => {
                showAdd();
            });
        })
        .catch((error) => console.error(error));
}

// Fonction qui affiche le formulaire d'ajout
function showAdd() {
    container.innerHTML = `
        <button id="btn-main" class="btn btn-primary mb-3">Accueil</button>
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

    const btnMain = document.getElementById('btn-main');
    btnMain.addEventListener('click', () => {
        showMain();
    });

    const btnCreate = document.getElementById('btn-create');
    btnCreate.addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const price = document.getElementById('price');
        const quantity = document.getElementById('quantity');

        fetch('http://localhost:3000/api/products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.value,
                price: parseInt(price.value * 100),
                quantity: parseInt(quantity.value),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.error) {
                    console.error(response.error);
                } else {
                    console.log(response.message);
                    showMain();
                }
            })
            .catch((error) => console.error(error));
    });
}

// Fonction qui affiche le formulaire de modification
function showUpdate(id) {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => response.json())
        .then((response) => {
            product = response.product;

            // prettier-ignore
            container.innerHTML = `
            <button id="btn-main" class="btn btn-primary mb-3">Accueil</button>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Nom</label>
                    <input type="text" class="form-control" id="name" value="${product.name}">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Prix (€)</label>
                    <input type="number" class="form-control" id="price" value="${product.price / 100}">
                </div>
                <div class="mb-3">
                    <label for="quantity" class="form-label">Quantité</label>
                    <input type="number" class="form-control" id="quantity" value="${product.quantity}">
                </div>
                <button id="btn-update" class="btn btn-primary">Valider</button>
            </form>
        `;

            const btnMain = document.getElementById('btn-main');
            btnMain.addEventListener('click', () => {
                showMain();
            });

            const btnUpdate = document.getElementById('btn-update');
            btnUpdate.addEventListener('click', (e) => {
                e.preventDefault();

                const name = document.getElementById('name');
                const price = document.getElementById('price');
                const quantity = document.getElementById('quantity');

                fetch(`http://localhost:3000/api/products/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name.value,
                        price: parseInt(price.value * 100),
                        quantity: parseInt(quantity.value),
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.error) {
                            console.error(response.error);
                        } else {
                            console.log(response.message);
                            showMain();
                        }
                    })
                    .catch((error) => console.error(error));
            });
        })
        .catch((error) => console.error(error));
}

showMain();
