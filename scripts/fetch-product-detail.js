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
    
})