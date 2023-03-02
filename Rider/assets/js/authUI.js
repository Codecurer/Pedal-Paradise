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

const loginForm = document.getElementById("loginForm");
loginForm.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('http://192.168.29.130:3000/login', {
        method: 'POST',
        body: new FormData(loginForm)

    }).then(function (response) {
        if (response.status==401) {
            alert("invalid credintails");
        }else{
            alert("success");
        }
        return response.json();

    }).then(function (data) {

        console.log(data.token);

        var base64Url = data.token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let tokenObj = JSON.parse(jsonPayload);
        console.log(tokenObj.user.isAdmin);
        if (tokenObj.user.isAdmin) {
            alert("Admin Panel");
        } else {
            alert("User Panel...");
        }
        // console.log(JSON.parse(jsonPayload));

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
