var productContainer = document.querySelector(".product-grid");
var submitButton = document.querySelector(".submit-button");
var productList = [];

function Product(productId, name, category, description, html){
    this.productId = productId;
    this.name = name;
    this.category = category;
    this.description = description;
    this.html = html;
}

fetch(`http://localhost:8000/search`)
    .then(response => {
        return response.json();
    })
    .then(data => {

        for (i=0; i<data.length; i++){

            const newPrice = data[i].price.toFixed(2);

            const product = `<span class="product-item ${data[i].category}">
            <a href="product-detail.html?id=${data[i].product_id}"><img src="${data[i].image_1}" alt="${data[i].name}"></a>
            <h4><a class="product-item__a-name" href="product-detail.html?id=${data[i].product_id}">${data[i].name}</a></h4>
            <p class="product-item__p-price">$ ${newPrice}</p>
            </span>`

            const x = new Product(data[i].product_id, data[i].name, data[i].category, data[i].description, product)
            
            productList.push(x)
        }
    })

function searchProducts(){

    productContainer.innerHTML = "";

    const searchInfo = document.querySelector(".search-bar__input").value;

    if(searchInfo === ""){
        alert("Type something in the search bar...")
        return;
    }

    for(i=0; i<productList.length; i++){
        if(productList[i].name.includes(searchInfo) === true || productList[i].category.includes(searchInfo) === true || productList[i].description.includes(searchInfo) === true){
            productContainer.innerHTML += productList[i].html
        }
    }

    if(productContainer.innerHTML === ""){
        productContainer.innerHTML = `<p style="display: block; margin: 20px auto 0px auto;"><i>No products available with this filter.</i></p>`;
    }

}

submitButton.addEventListener("click", searchProducts);