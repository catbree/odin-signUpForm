const signUpForm = document.querySelector(".signUpForm");

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#passwordConfirmation");

const firstNameError = firstName.nextElementSibling;
const lastNameError = lastName.nextElementSibling;
const emailError = email.nextElementSibling;
const passwordError = password.nextElementSibling;
const passwordConfirmationError = passwordConfirmation.nextElementSibling;

// Ensures visitors aren't greeting with red on load.
// figuring out how...


firstName.addEventListener("input", () => {
    if (firstName.validity.valid) {
        firstNameError.textContent = "";
        firstNameError.className = "errorMessage";
    } else {
        showError(firstName);
    }
})

lastName.addEventListener("input", () => {
    if (lastName.validity.valid) {
        lastNameError.textContent = "";
        lastNameError.className = "errorMessage";
    } else {
        showError(lastName);
    }
})

email.addEventListener("input", () => {
    if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "errorMessage";
    } else {
        showError(email);
    }
})

password.addEventListener("input", () => {
    if (password.validity.valid) {
        passwordError.textContent = "";
        passwordError.className = "errorMessage";
    } else {
        showError(password);
    }

    validatePasswordSimilarity();
})

passwordConfirmation.addEventListener("input", () => {
    validatePasswordSimilarity();
})

const showError = (inputField) => {
    const inputFieldError = inputField.nextElementSibling;

    if(inputField.validity.valueMissing) {
        inputFieldError.textContent = "This field is required.";
    }

    if((inputField.type=="email") && (inputField.validity.typeMismatch)) {
        inputFieldError.textContent = "This needs to be an email address."
    }

    if((inputField.type=="password") && (inputField.validity.tooShort)) {
        inputFieldError.textContent = `At least ${inputField.minLength} characters needed`
    }
}

const validatePasswordSimilarity = () => {
    if(password.value !== passwordConfirmation.value) {
        passwordConfirmationError.textContent = "Passwords don't match."
        passwordConfirmation.className="invalid";

    } else {
        passwordConfirmationError.textContent = "";
        passwordConfirmationError.className = "errorMessage";
        passwordConfirmation.className="";
    }
}