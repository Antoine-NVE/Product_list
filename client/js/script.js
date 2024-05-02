const container = document.getElementById('container');

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
                    <td colspan="4"><button id="btn-add" class="btn btn-primary d-block w-100">Ajouter un produit</button></td>
                </tr>
            </tbody
        </table>
    `;

    const btnAdd = document.getElementById('btn-add');
    btnAdd.addEventListener('click', () => {
        console.log('Ajout');
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
