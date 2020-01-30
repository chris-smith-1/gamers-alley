//FORM VALIDATION TEST
var contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", formValidation);

function Customer(firstName, lastName, email, phoneNumber, preferredContactMethod1, preferredContactMethod2, referralSource1, referralSource2, referralSource3, referralSource4, referralSource5){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.preferredContactMethod1 = preferredContactMethod1;
    this.preferredContactMethod2 = preferredContactMethod2;
    this.referralSource1 = referralSource1;
    this.referralSource2 = referralSource2;
    this.referralSource3 = referralSource3;
    this.referralSource4 = referralSource4;
    this.referralSource5 = referralSource5;
}

function formValidation(e){
    e.preventDefault();

    referralSources = [];

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

    referralSources.push(referralSource1, referralSource2, referralSource3, referralSource4, referralSource5);
    
    for(i=0; i<referralSources.length; i++){
        if(referralSources[i].checked === true){
            console.log(referralSources[i])
        }

        break;
    }

    var customer = new Customer(firstName, lastName, email, phoneNumber, preferredContactMethod1, preferredContactMethod2, referralSource1, referralSource2, referralSource3, referralSource4, referralSource5);

    console.log(customer);

    contactForm.reset();
}