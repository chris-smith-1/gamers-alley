// Global Variables
var login;

// Get the modal
var modal = document.querySelector(".login-modal");

// Get the buttons that opens the modal
var loginButton = document.querySelector(".navbar-item__login");
loginButton.addEventListener("click", setToLogin)
var signupButton = document.querySelector(".navbar-item__signup");
signupButton.addEventListener("click", setToSignup)

// Get the <span> element that closes the modal
var span = document.querySelector(".close-modal");

// Get the Modal tab buttons (login/signup)
var modalButtonLogin = document.querySelector(".modal__button--login");
modalButtonLogin.addEventListener("click", setToLogin)
var modalButtonSignup = document.querySelector(".modal__button--signup");
modalButtonSignup.addEventListener("click", setToSignup)

// Get Submit Button
var modalSubmitButton = document.querySelector(".modal__input--button")
modalSubmitButton.addEventListener("click", infoToServer)

// When the user clicks on the button, open the modal
function setToLogin() {
  modal.style.display = "block";
  modalButtonLogin.style.backgroundColor = "#343a40";
  modalButtonLogin.style.color = "whitesmoke";

  modalButtonSignup.style.backgroundColor = "white";
  modalButtonSignup.style.color = "black";

  login = true;
//   console.log(login)
}

function setToSignup() {
    modal.style.display = "block";
    modalButtonSignup.style.backgroundColor = "#343a40";
    modalButtonSignup.style.color = "whitesmoke";

    modalButtonLogin.style.backgroundColor = "white";
    modalButtonLogin.style.color = "black";

    login = false;
    // console.log(login)
  }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    const email = document.querySelector(".modal__input--email");
    const password = document.querySelector(".modal__input--password");

    email.value = "";
    password.value = "";
    modal.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    const email = document.querySelector(".modal__input--email");
    const password = document.querySelector(".modal__input--password");

    email.value = "";
    password.value = "";
    modal.style.display = "none";
  }
}

//SERVER REQUESTS
function infoToServer(){
    const email = document.querySelector(".modal__input--email").value;
    const password = document.querySelector(".modal__input--password").value;
    if(login === true){
        loginInfoToServer(email, password);
    }else if(login === false){
        signupInfoToServer(email, password);
    }else{
        console.log("Data not submitted to server.")
    }
}

function signupInfoToServer(email, password){
    var user = new User(email, password);
    JSONUser = JSON.stringify(user)

    fetch("http://localhost:8000/signup", {
    mode: 'no-cors',    
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSONUser
    })
    // .then(response => response) hehe :)
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
}

function User(email, password){
    this.email = email;
    this.password = password;
}