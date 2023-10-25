const cart = document.getElementById('cart__items');
let IDs = []
let productIndexes = []
let amount = 0;

function getLocalStorage(products) {
    for(item in products) {
        if (localStorage.getItem(products[item].name) != null) {
            let result = JSON.parse(localStorage.getItem(products[item].name))
            IDs.push(result)
        }
    }
    for (all in products) {
        for(each in IDs) {
            if (products[all]._id == IDs[each][2]) {
                productIndexes.push(all)
            }
        } 
    }

    for (indexes in productIndexes) {
        createArticle(products, productIndexes[indexes], IDs[indexes][0], IDs[indexes][1])
    }

    Totals(products, productIndexes)

    
}

function Totals (products, productIndexes) {
    let articlesTotal = document.getElementById('totalQuantity');
    let priceTotal = document.getElementById('totalPrice');

    articlesTotal.textContent = IDs.length;
    priceTotal.textContent = amount;
}

function createArticle(products, productIndexes, coloursSelected, QuantitySelected) {

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

    newArticle.classList.add('cart__item');
    newArticle.dataset.id = products[productIndexes]._id;
    newArticle.dataset.color = coloursSelected;
    itemImgDiv.classList.add('cart__item__img');
    itemImg.src = products[productIndexes].imageUrl;
    itemImg.alt = products[productIndexes].altTxt;
    itemContent.classList.add('cart__item__content');
    itemContentDesc.classList.add('cart__item__content__description');
    title.textContent = products[productIndexes].name;
    itemColour.textContent = coloursSelected;
    price.textContent = '€' + products[productIndexes].price * QuantitySelected;
    contentSettings.classList.add('cart__item__content__settings')
    contentSettingsQuantity.classList.add('cart__item__content__settings__quantity')
    quantity.textContent = 'Quantity : ' + QuantitySelected;
    changeQuantity.classList.add('itemQuantity')
    changeQuantity.name = 'itemQuantity';
    changeQuantity.type = 'number';
    changeQuantity.value = QuantitySelected;
    changeQuantity.min = 1;
    changeQuantity.max = 100;
    del.classList.add('cart__item__content__settings__delete');
    delText.classList.add('deleteItem');
    delText.textContent = 'Delete';

    newArticle.appendChild(itemImgDiv);
    itemImgDiv.appendChild(itemImg);
    newArticle.appendChild(itemContent);
    itemContent.appendChild(itemContentDesc);
    itemContent.appendChild(contentSettings);
    itemContentDesc.appendChild(title);
    itemContentDesc.appendChild(itemColour)
    itemContentDesc.appendChild(price)
    contentSettings.appendChild(contentSettingsQuantity)
    contentSettings.appendChild(del);
    contentSettingsQuantity.appendChild(quantity)
    contentSettingsQuantity.appendChild(changeQuantity);
    del.appendChild(delText);
    cart.appendChild(newArticle)

    amount += products[productIndexes].price * QuantitySelected
}

async function addProducts(link) {
    let myObject = await fetch(link);
    let products = await myObject.json();
    getLocalStorage(products);
}

addProducts('http://localhost:3000/api/products')