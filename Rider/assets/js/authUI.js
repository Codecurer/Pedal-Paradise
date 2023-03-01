function toggleSignup() {
    document.getElementById("login-toggle").style.backgroundColor = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function toggleLogin() {
    document.getElementById("login-toggle").style.backgroundColor = "#57B846";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

const em = document.getElementById("em");
const pw = document.getElementById("pw");

const profile = document.getElementById("profile");
const lnumber = document.getElementById("lnumber");
const email = document.getElementById("email");
const fname = document.getElementById("fName");
const password = document.getElementById("password");
const cPassword = document.getElementById("confirmPassword");
const mNumber = document.getElementById("mobileNumber");

loginForm.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('http://192.168.29.131:3000/login', {
        method: 'POST',
        body: new FormData(loginForm)

    }).then(function (response) {

        return response.json();

    }).then(function (data) {
        
        console.log(data.token);

        var base64Url = data.token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        console.log(JSON.parse(jsonPayload));

    });

    // fetch('http://192.168.29.131:3000/login')

    // console.log(response.body);


    //let result = await response.json();

    // if (result.isAdmin == null) {
    //     window.location.href = "http://127.0.0.1:5501/index.html";
    // } else {
    //     window.location.href = "../Admin/index.html";
    // }
}
signUpForm.onsubmit = async (e) => {

    e.preventDefault();

    let response = await fetch('http://192.168.29.131:3000/user/register', {
        method: 'POST',
        body: new FormData(signUpForm)
    });

    let result = await response.json();

    console.log(result.isAdmin);

    alert(result.isAdmin);
};
