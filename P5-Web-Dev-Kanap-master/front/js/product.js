const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const imageDiv = document.getElementById('image')
const title = document.getElementById('title')
const price = document.getElementById('price')
const desc = document.getElementById('description')

function addDetails(product) {
    let image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    imageDiv.appendChild(image)

    title.textContent = product.name;
    price.textContent = product.price;
    desc.textContent = product.description;
}

async function addProduct(link) {
    let myObject = await fetch(link);
    let product = await myObject.json();
    console.log(product)
    document.title = product.name;
    addDetails(product)
}

addProduct('http://localhost:3000/api/products/' + id)


