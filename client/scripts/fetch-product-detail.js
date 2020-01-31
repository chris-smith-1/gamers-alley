// Get ID from query string parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id)

// Get data from external resource
fetch(`http://localhost:8000/product-detail/${id}`)
.then(response => {
    return response.json()
})
.then(data => {
    console.log(data)
    document.querySelector(".product-name").innerHTML = data.name;
    document.querySelector(".product-info__img--main").src = data.image_1;
    document.querySelector(".product-info__p").innerHTML = data.description;
    document.querySelector(".product-price").innerHTML = `$ ${data.price.toFixed(2)}`;
    document.querySelector(".product-info__img--small-1").src = data.image_1;
    document.querySelector(".product-info__img--small-2").src = data.image_2;
    document.querySelector(".product-info__img--small-3").src = data.image_3;
    document.querySelector(".product-info__img--small-4").src = data.image_4;
    document.querySelector(".product-info__img--small-5").src = data.image_5;
})

// Update main image when clicking on image bar
function updateImageMain(){
    mainImage.src = this.src;
}

var mainImage = document.querySelector(".product-info__img--main");
var smallImage1 = document.querySelector(".product-info__img--small-1");
var smallImage2 = document.querySelector(".product-info__img--small-2");
var smallImage3 = document.querySelector(".product-info__img--small-3");
var smallImage4 = document.querySelector(".product-info__img--small-4");
var smallImage5 = document.querySelector(".product-info__img--small-5");

var imageBar = [smallImage1, smallImage2, smallImage3, smallImage4, smallImage5]

for(i=0; i<imageBar.length; i++){
    imageBar[i].addEventListener("click", updateImageMain)
}