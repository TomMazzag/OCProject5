const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const imageDiv = document.getElementById('image');
const title = document.getElementById('title');
const price = document.getElementById('price');
const desc = document.getElementById('description');
const dropDown = document.getElementById('colors');

const cart = document.getElementById('addToCart');

function addDetails(product) {
    let image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    imageDiv.appendChild(image)

    title.textContent = product.name;
    price.textContent = product.price;
    desc.textContent = product.description;

    for (colours in product.colors) {
        let item = document.createElement('option');
        item.textContent = product.colors[colours];
        dropDown.appendChild(item)
    }
}

async function addProduct(link) {
    let myObject = await fetch(link);
    let product = await myObject.json();
    document.title = product.name;
    addDetails(product)
}

addProduct('http://localhost:3000/api/products/' + id)

let selectedQuantity = '';
let selectedColour = '';

document.getElementById('quantity').addEventListener('change', $event => {
    selectedQuantity = $event.target.value;
})

document.getElementById('colors').addEventListener('change', $event => {
    selectedColour = $event.target.value;
})

cart.addEventListener('click', () => {
    if (selectedQuantity > 0 && dropDown != '--Please, select a color --') {
        added = [selectedColour, selectedQuantity, id]
        localStorage.setItem('Product', added)
    }
    
})

