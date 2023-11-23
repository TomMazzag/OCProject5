const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('orderId');

function addUserOrder () {
    let orderNum = document.getElementById('orderId')
    orderNum.textContent = id
}

addUserOrder()