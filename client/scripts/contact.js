//FORM VALIDATION TEST
var contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", formValidation);

function Customer(firstName, lastName, email, phoneNumber, preferredContactMethod, referralSource, otherComments){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.preferredContactMethod = preferredContactMethod;
    this.referralSource = referralSource;
    this.otherComments = otherComments;
}

function formValidation(e){
    e.preventDefault();

    let referralSource;
    let preferredContactMethod;
    let referralSources = [];

    const firstName = document.querySelector(".input--first-name");
    const lastName = document.querySelector(".input--last-name");
    const email = document.querySelector(".input--email");
    const phoneNumber = document.querySelector(".input--phone-number");
    const preferredContactMethod1 = document.querySelector(".input__radio--email");
    const preferredContactMethod2 = document.querySelector(".input__radio--phone");
    const referralSource1 = document.querySelector(".input__radio--conference");
    const referralSource2 = document.querySelector(".input__radio--tv");
    const referralSource3 = document.querySelector(".input__radio--radio");
    const referralSource4 = document.querySelector(".input__radio--wordofmouth");
    const referralSource5 = document.querySelector(".input__radio--other");
    const otherComments = document.querySelector(".contact-form__textarea");

    const newPhoneNumber = phoneNumber.value.replace(/-/g, "");
    console.log(newPhoneNumber)

    referralSources.push(referralSource1, referralSource2, referralSource3, referralSource4, referralSource5);
    
    for(i=0; i<referralSources.length; i++){
        if(referralSources[i].checked === true){
            referralSource = referralSources[i].nextSibling.innerHTML;
            break;
        }
    }

    if(preferredContactMethod1.checked === true){
        preferredContactMethod = preferredContactMethod1.nextSibling.innerHTML;
    }else if(preferredContactMethod2.checked === true){
        preferredContactMethod = preferredContactMethod2.nextSibling.innerHTML;
    }else{
        console.error("No preferred contact method selected");
    }

    var customer = new Customer(firstName.value, lastName.value, email.value, newPhoneNumber, preferredContactMethod, referralSource, otherComments.value);

    JSONCustomer = JSON.stringify(customer)

    console.log(JSONCustomer);

    fetch("http://localhost:8000/contact", {
    mode: 'no-cors',    
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSONCustomer
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    contactForm.reset();
}