(function buildDOM(){

    //BUILD GRID
    var productContainer = document.querySelector(".product-list");
    var productList = [];
    var fullProductList;

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

        fullProductList = productContainer.innerHTML;
    })

    //SETUP CATEGORY FILTER
    var filterCheckboxes = document.querySelectorAll(".product-filter__input");
    console.log(filterCheckboxes)

    var updateProductGrid = function(){

        //Clear DOM
        productContainer.innerHTML = "";
        var numberTrue = 0;

        //Loop through "checked" checkboxes
        for(i=0; i<filterCheckboxes.length; i++){
            
            //Check each checkbox for "checked"
            if(filterCheckboxes[i].checked === true){
                console.log(filterCheckboxes[i].name)
                numberTrue += 1
                const filterName = filterCheckboxes[i].name

                for (i=0; i<productList.length; i++) {
                    if(filterName === productList[i].category){
                        productContainer.innerHTML += productList[i].html;
                    }else{
                        console.log("items not added to DOM")
                    }
                }
            }
        }

        if(numberTrue === 0){
            productContainer.innerHTML = fullProductList;
        }

        if(productContainer.innerHTML === ""){
            productContainer.innerHTML = `<p style="display: block; margin: 20px auto 0px auto;"><i>No products available with this filter.</i></p>`;
        }
    }
    
    for (i=0; i<filterCheckboxes.length; i++){

        filterCheckboxes[i].addEventListener("click", updateProductGrid)

    }
})()

