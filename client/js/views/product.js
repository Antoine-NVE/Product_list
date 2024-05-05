export function showMain(products) {
    const container = document.getElementById('container');

    container.innerHTML = `
        <div class="col-12 mt-3">
            <table class="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                </tbody
            </table>
        </div>
    `;

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
    body += `
        <tr>
            <td colspan="4"><a href="#/create" class="btn btn-primary w-100">Ajouter un produit</a></td>
        </tr>
    `;

    const tbody = document.getElementById('tbody');
    tbody.innerHTML = body;
}

export function showCreate() {
    const container = document.getElementById('container');

    container.innerHTML = `
        <div class="col-12 mt-3">
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
        </div>
    `;
}

export function showUpdate(product) {
    const container = document.getElementById('container');

    // prettier-ignore
    container.innerHTML = `
        <div class="col-12 mt-3">
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
        </div>
    `;
}
