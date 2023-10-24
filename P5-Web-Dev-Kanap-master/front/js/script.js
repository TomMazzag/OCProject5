const items = document.getElementById('items');

function newProduct(products, product) {
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

    newArticle.appendChild(title);
    newArticle.appendChild(description);
    newArticle.appendChild(image);
    return newArticle;
}

async function getText(file) {
    let myObject = await fetch(file);
    let products = await myObject.json();
    for (product in products) {
        items.appendChild(newProduct(products, product))
    }

    
}

getText('http://localhost:3000/api/products')