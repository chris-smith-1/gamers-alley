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
            <p class="product-item__p-price">$ ${newPrice}</p>
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

    var updateProductGrid = function(){
    
        const checkedBoxes = [];
        let numberTrue = 0;

        //Clear DOM
        productContainer.innerHTML = "";

        //Loop through "checked" checkboxes
        for(i=0; i<filterCheckboxes.length; i++){
            //Check each checkbox for "checked"
            if(filterCheckboxes[i].checked === true){                
                checkedBoxes.push(filterCheckboxes[i].name)
            }
        }

        for(i=0; i<productList.length; i++){

            // if(productList[i].category === checkedBoxes[0]){
            //     console.log("it works")
            // }


            if(productList[i].category === checkedBoxes[0] || productList[i].category === checkedBoxes[1] || productList[i].category === checkedBoxes[2] || productList[i].category === checkedBoxes[3]){
                
                numberTrue += 1;

                productContainer.innerHTML += productList[i].html;
                console.log(productList[i].category)
            }

        }

        if(checkedBoxes.length === 0){
            productContainer.innerHTML = fullProductList;
        }

        if(checkedBoxes.length > 0 && productContainer.innerHTML === ""){
            productContainer.innerHTML = `<p style="display: block; margin: 20px auto 0px auto;"><i>No products available with this filter.</i></p>`;
        }
    }
    
    for (i=0; i<filterCheckboxes.length; i++){

        filterCheckboxes[i].addEventListener("click", updateProductGrid)

    }
})()