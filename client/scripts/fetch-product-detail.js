function Product(id){
    this.id = id;
}

// Get ID from query string parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const product = new Product(id)
JSONproduct = JSON.stringify(product)

// Get data from external resource
fetch(`http://localhost:8000/product-detail/${id}`)
.then(response => {
    return response.json()
})
.then(data => {
    document.querySelector(".product-name").innerHTML = data.name;
    document.querySelector(".product-info__img--main").src = data.image_1;
    document.querySelector(".product-info__p").innerHTML = data.description;
    document.querySelector(".product-price").innerHTML = data.price;
    document.querySelector(".product-info__img--small-1").src = data.image_1;
    document.querySelector(".product-info__img--small-2").src = data.image_1;
    document.querySelector(".product-info__img--small-3").src = data.image_1;
    document.querySelector(".product-info__img--small-4").src = data.image_1;
    document.querySelector(".product-info__img--small-5").src = data.image_1;
})