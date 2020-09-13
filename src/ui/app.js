const { remote } = require('electron'); //Permite conectar com o arquivo MAIN.JS
const main = remote.require('./main');

const produtcForm = document.getElementById('productForm');

const produtcName = document.getElementById('name');
const produtcPrice = document.getElementById('price');
const produtcDescription = document.getElementById('description');
const productList = document.getElementById('products');

let products = [];
let editingStatus = false;
let editProductId = '';

produtcForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (verificaCampos()) {

        const newProduct = {
            name: produtcName.value,
            price: produtcPrice.value,
            description: produtcDescription.value
        }

        //Criando
        if (editingStatus == false) {
            const result = await main.createProduct(newProduct);
            swal("Sucesso!", "Produto cadastrado!", "success");
        }
        //Editando
        else {
            main.updateProduct(editProductId, newProduct);

            editingStatus = false;
            editProductId = '';
        }

        produtcForm.reset();
        produtcName.focus();

        getProducts();

    }

});

function deleteProduct(id) {

    swal({
        title: "Exclusão",
        text: "Você tem certeza que deseja excluir o produto?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                main.deleteProduct(id);
                getProducts();

                swal("Produto deletado com sucesso!", {
                    icon: "success",
                });
            }
        });
}

async function editProduct(id) {
    const product = await main.getProductById(id);
    produtcName.value = product.name;
    produtcPrice.value = product.price;
    produtcDescription.value = product.description;

    editingStatus = true;
    editProductId = product.id;

}

function renderProducts(products) {
    productList.innerHTML = ''; //Reseta lista
    products.forEach(product => {
        productList.innerHTML += `
            <div class="card card-body my-2 animated infinite bounce">
                <div class="row">
                    <div class="col-md-8"> 
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                    </div>
                    <div class="col-md-4 text-right"> 
                        <p>R$ ${product.price}</p>
                    </div>
                </div>
                <p>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">DELETAR</button>
                    <button class="btn btn-info" onclick="editProduct('${product.id}')">EDITAR</button>
                </p>
            </div>
        `
    });
}

const getProducts = async () => {
    products = await main.getProducts();
    renderProducts(products);
}

async function init() {
    await getProducts();
}

function verificaCampos() {
    if (produtcName.value == '' || produtcPrice.value == '') {
        swal("Atenção!", "Campo nome e preço são obrigatórios!", "warning");
        return false;
    }
    return true;
}

init();