let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPass = document.getElementById("confirmPassword");
let regBtn = document.getElementById("btn");
let form = document.getElementById("register");
const nameRegex = /[A-Z][a-z]{2,}/;
const emailRegex = /^[a-zA-Z0-9]{4,40}@(gmail|yahoo)\.com$/;
const passwordRegex = /[A-Z][a-z]{2,}/;
const confirmRegex = /[A-Z][a-z]{2,}/;

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
var userData = [];
if(localStorage.getItem("data")){
  userData = JSON.parse(localStorage.getItem("data"))
}else {
  userData = []
}

let user;
regBtn.addEventListener("click", () => {
  user = {
    Name: username.value,
    Email: email.value,
    Password: password.value,
    confirmPassword: confirmPass.value,
  };
  // inputsValid();
  if (inputsValid() == true) {

    window.location.replace("/assests/login.html")
  }
  clearInputs();
});





function inputsValid() {
  validationName();
  validationEmail();
  validationPassword();
  validationConfirm()
  if(validationName&&validationEmail&&validationPassword&&validationConfirm){
    userData.push(user);
    localStorage.setItem("data", JSON.stringify(userData));
  }

}



function validationName() {
  if (user.Name != "" && nameRegex.test(user.Name)) {
    username.classList.add("is-valid");
    return true;
  } else {
    username.classList.add("is-invalid");
    username.nextElementSibling.innerHTML = "Please enter a valid username";
    return false;
  }
}
function validationEmail() {
  if (user.Email != "" && emailRegex.test(user.Email)) {
    email.classList.add("is-valid");
    return true;
  } else {
    email.classList.add("is-invalid");
    email.nextElementSibling.innerHTML = "Please enter a valid email";
    return false;
  }
}
function validationPassword() {
  if (user.Password != "" && passwordRegex.test(user.Password)) {
    password.classList.add("is-valid");
    return true;
  } else {
    password.classList.add("is-invalid");
    password.nextElementSibling.innerHTML = "Please enter a valid password";
    return false;
  }
}
function validationConfirm() {
  if (
    user.confirmPassword != "" && confirmRegex.test(user.confirmPassword) && user.confirmPassword == user.Password
  ) {
    confirmPass.classList.add("is-valid");
    return true;
  } else {
    confirmPass.classList.add("is-invalid");
    confirmPass.nextElementSibling.innerHTML = "Please match the password";
    return false;
  }
}
function clearInputs(){
  username.value = "";
  email.value = "";
  password.value = "";
  confirmPass.value = "";

}