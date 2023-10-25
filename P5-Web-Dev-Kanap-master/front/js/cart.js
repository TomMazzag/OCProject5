let inCart = [];
const cart = document.getElementById('cart__items');

function getLocalStorage(products) {
    for(item in products) {
        if (localStorage.getItem(products[item].name) != null) {
            inCart.push([localStorage.getItem(products[item].name)]);
        }
    }
    console.log(inCart[0])
}

function createArticle(products) {
    let newArticle = document.createElement('article');
    let itemImgDiv  = document.createElement('div');
    let itemImg = document.createElement('img');
    let itemContent  = document.createElement('div');
    let itemContentDesc  = document.createElement('div');
    let title = document.createElement('h2');
    let itemColour = document.createElement('p');
    let price = document.createElement('p');
    let contentSettings  = document.createElement('div');
    let contentSettingsQuantity  = document.createElement('div');
    let quantity = document.createElement('p');
    let changeQuantity = document.createElement('input');
    let del = document.createElement('div');
    let delText = document.createElement('p');

    newArticle.appendChild(itemImgDiv);
    itemImgDiv.appendChild(itemImg);
    newArticle.appendChild(itemContent);
    itemContent.appendChild(itemContentDesc, contentSettings);
    itemContentDesc.appendChild(title, itemColour, price);
    contentSettings.appendChild(contentSettingsQuantity, del)
    contentSettingsQuantity.appendChild(quantity, changeQuantity)
    del.appendChild(delText);
    cart.appendChild(newArticle)
}

async function addProducts(link) {
    let myObject = await fetch(link);
    let products = await myObject.json();
    getLocalStorage(products);
    createArticle(products);
}

addProducts('http://localhost:3000/api/products')