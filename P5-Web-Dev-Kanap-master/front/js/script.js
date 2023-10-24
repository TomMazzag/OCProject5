async function getText(file) {
    let myObject = await fetch(file);
    let products = await myObject.json();
    for (product in products) {
        console.log(products[product].name)
    }
    let test = products[0]
    console.log(test);
}

getText('http://localhost:3000/api/products')