var productContainer = document.querySelector(".product-list");

// Get data from api
fetch(`http://localhost:8000/products`)
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
    for (i=0; i<data.length; i++){

        const newPrice = data[i].price.toFixed(2);

        //Add products to DOM
        productContainer.innerHTML += `<span class="product-item">
        <a href="product-detail.html?id=${data[i].product_id}"><img src="${data[i].image_1}" alt="${data[i].name}"></a>
        <h4><a class="product-item__a-name" href="product-detail.html?id=${data[i].product_id}">${data[i].name}</a></h4>
        <p>$${newPrice}</p>
        </span>`
    }

    console.log(productContainer)
})