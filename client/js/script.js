const container = document.getElementById('container');

// Fonction qui affiche la page d'accueil
function showMain(products) {
    let body = '';
    for (let i = 0; i < products.length; i++) {
        body += `
            <tr>
                <td>${products[i].name}</td>
                <td>${products[i].price / 100} €</td>
                <td>${products[i].quantity}</td>
                <td>Actions</td>
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

    const btnAdd = document.getElementById('btn-add');
    btnAdd.addEventListener('click', () => {
        showAdd();
    });
}

// Fonction qui affiche le formulaire d'ajout
function showAdd() {
    container.innerHTML = `
        <button id="btn-main" class="btn btn-primary">Accueil</button>
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;

    const btnMain = document.getElementById('btn-main');
    btnMain.addEventListener('click', () => {
        showMain(products);
    });
}

const products = [
    {
        name: 'Ecran',
        price: 12500,
        quantity: 12,
    },
    {
        name: 'Carte mère',
        price: 20500,
        quantity: 8,
    },
];

showMain(products);
