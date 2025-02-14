let Email = document.getElementById("email")
let Password = document.getElementById("password")
let anchor = document.getElementById("submit")
let logBtn = document.getElementById("loginBtn")
let form = document.getElementById("login");

form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

var userData = [];

userData = JSON.parse(localStorage.getItem("data"))
console.log(userData);
logBtn.addEventListener("click" , login())
function login(){
    for(let i=0; i<userData.length; i++){
        if( Email.value == "" && userData[i].Email != Email.value){
            Email.nextElementSibling.innerHTML="please enter a valid Email"
        }
        if(Password.value == "" && userData[i].password != Password.value){
            Password.nextElementSibling.innerHTML="please enter correct password"
        }
        if(userData[i].Email == Email.value && userData[i].Password == Password.value) {
            localStorage.setItem("userName" , userData[i].Name)
            window.location.href = "/assests/home.html"
}
}
}