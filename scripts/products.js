(function buildDOM(){

    //BUILD GRID
    var productContainer = document.querySelector(".product-list");
    var productList = [];

    function Product(category, html){
        this.category = category;
        this.html = html;
    }

    // Get data from api
    fetch(`http://localhost:8000/products`)
    .then(response => {
        return response.json();
    })
    .then(data => {

        for (i=0; i<data.length; i++){

            const newPrice = data[i].price.toFixed(2);

            const product = `<span class="product-item ${data[i].category}">
            <a href="product-detail.html?id=${data[i].product_id}"><img src="${data[i].image_1}" alt="${data[i].name}"></a>
            <h4><a class="product-item__a-name" href="product-detail.html?id=${data[i].product_id}">${data[i].name}</a></h4>
            <p class="product-item__p-price">$${newPrice}</p>
            </span>`

            const x = new Product(data[i].category, product)
            
            productList.push(x)            

            //Add products to DOM
            productContainer.innerHTML += product
        }
    })

    //SETUP CATEGORY FILTER
    var filterCheckboxes = document.querySelectorAll(".product-filter__input");

    var updateProductGrid = function(){

        document.querySelector(".product-list").innerHTML = "";

        for(i=0; i<filterCheckboxes.length; i++){

            if(filterCheckboxes[i].checked === true){
                
            }else{
                continue;
            }

        }
    }
    
    for (i=0; i<filterCheckboxes.length; i++){

        filterCheckboxes[i].addEventListener("click", updateProductGrid)

    }
})()