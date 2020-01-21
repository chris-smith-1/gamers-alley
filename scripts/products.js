// Get data from api
fetch(`http://localhost:8000/products/`)
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
})