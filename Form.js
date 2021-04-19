var loginForm = document.getElementById("login-form");

loginForm.onsubmit = function(e){
    e.preventDefault();
 
    var usernameInput =document.getElementById("username-input")
    var passwordInput =document.getElementById("password-input")
   
    var obj = {
        username: usernameInput.value,
        password: passwordInput.value,
    }

    var http = new XMLHttpRequest();
    http.open("POST", "https://607c412c67e6530017573d5a.mockapi.io/users", true)
    http.onreadystatechange = function (){
        if(this.readyState === 4){
            localStorage.setItem("userLoggedInStatus", true);
            localStorage.setItem("username",usernameInput.value);
            localStorage.setItem("password",passwordInput.value);
            location.assign("./index.html"); 
        }
    }
    http.send(JSON.stringify(obj));
}