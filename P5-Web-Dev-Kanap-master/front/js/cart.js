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

    changeQuantity(products)

    deleteFromCart(products)
    
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
    price.textContent = '€' + products[productIndexes].price;
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

function changeQuantity (products) {
    let cartItems = document.querySelectorAll('.cart__item')
    for (let item of cartItems) {
        item.addEventListener('change', (event) => {
            for (product of products) {
                if (product._id === item.dataset.id) {
                    let changeTo = event.target.value
                    let original = JSON.parse(localStorage.getItem(product.name))
                    original[1] = changeTo
                    console.log(original)
                    localStorage.setItem(product.name, JSON.stringify(original))
                    return location.reload();
                } 
            }
        })
    }
}

function deleteFromCart (products) {
    let cartItems = document.querySelectorAll('.cart__item__content__settings__delete')
    for (let item of cartItems) {
        item.addEventListener('click', (event) => {
            selectedID = item.closest(".cart__item")
            for (product of products) {
                if (product._id === selectedID.dataset.id) {
                    localStorage.removeItem(product.name)
                    return location.reload();
                } 
            }
        })
    }
}

async function addProducts(link) {
    let myObject = await fetch(link);
    let products = await myObject.json();
    getLocalStorage(products);
}

addProducts('http://localhost:3000/api/products')

function userDetails () {
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    let order = document.getElementById('order');

    email.addEventListener('change', (event) => {
        ValidateEmail(email)
    })


    order.addEventListener('click', (event) => {
        event.preventDefault()
        if (ValidateEmail(email) == true) {

            chosenProductIds = []
            let cartItems = document.querySelectorAll('.cart__item')
            for (let item of cartItems) {
                itemId = item.dataset.id
                chosenProductIds.push(itemId)
            }

            const usersReceipt = {
                'contact': {
                    'firstName': firstName.value,
                    'lastName': lastName.value,
                    'address': address.value,
                    'city': city.value,
                    'email': email.value,   
                },
                'products' : chosenProductIds
            }
        
            const configOptions = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(usersReceipt),
            }

            fetch('http://localhost:3000/api/products/order', configOptions)
                .then(xyz => {
                    if (!xyz.ok) {
                        throw new Error(xyz.statusText);
                    }
                    return xyz.json();
                })
                .then(usersReceipt => {
                    window.location = '/P5-Web-Dev-Kanap-master/front/html/confirmation.html?orderId=' + usersReceipt.orderId;
                })
                .catch(e => {
                    console.log(e);
                    if (e instanceof Response) {
                        e.text().then(errorMessage => {
                            console.error('Response Status:', e.status);
                            console.error('Response Body:', errorMessage);
                        });
                    }
                });
            //window.location = '/P5-Web-Dev-Kanap-master/front/html/confirmation.html'
        }
    })
    
}

userDetails()

function ValidateEmail(email) {
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(format)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

function sendRecieptDetails(link, configOptions) {
    fetch(link, configOptions)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
            }).then(usersReciept => {
            console.log(usersReciept);
            }).catch(e => {
                console.log(e);
                });
}