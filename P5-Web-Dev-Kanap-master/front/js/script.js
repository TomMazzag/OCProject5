const items = document.getElementById('items');

function newProduct(products, product) {
    let link = document.createElement('a');
    let newArticle = document.createElement('article');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let image = document.createElement('img');

    title.textContent = products[product].name;
    title.classList.add('productName');
    description.textContent = products[product].description;
    description.classList.add('productDescription');
    image.src = products[product].imageUrl;
    image.alt = products[product].altTxt;
    link.href = '/P5-Web-Dev-Kanap-master/front/html/product.html?id=' + products[product]._id;

    newArticle.appendChild(title);
    newArticle.appendChild(description);
    newArticle.appendChild(image);
    link.appendChild(newArticle)
    return link;
}

async function addProducts(link) {
    let myObject = await fetch(link);
    let products = await myObject.json();
    for (product in products) {
        items.appendChild(newProduct(products, product))
    }
}

addProducts('http://localhost:3000/api/products')