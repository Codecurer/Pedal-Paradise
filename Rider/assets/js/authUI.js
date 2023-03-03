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
if (JSON.parse(localStorage.getItem("authToken")) != null) {
    if (JSON.parse(localStorage.getItem("authToken")).role) {
        window.location.href = "../Admin/index.html";
    } else {
        window.location.href = "../Rider/index.html";
    }
}
const tokenDecode = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return tokenObj = JSON.parse(jsonPayload);
}
const loginForm = document.getElementById("loginForm");
loginForm.onsubmit = async (e) => {
    e.preventDefault();

    try {

        let response = await fetch('http://192.168.29.130:3000/login', {
            method: 'POST',
            body: new FormData(loginForm)

        }).then(function (response) {
            if (response.status == 401) {
                throw new Error(`error has been occured`);
            } else {
                return response.json();
            }

        }).then(function (data) {

            try {
                if (data != null) {

                    const accessToken = tokenDecode(data.accesstoken);

                    const authRole = {
                        role: accessToken.user.isAdmin ? true : false,
                        token: data.accesstoken,
                        RefreshToken: data.refreshtoken
                    }

                    localStorage.setItem("authToken", JSON.stringify(authRole));

                    if (accessToken.user.isAdmin) {
                        window.location.href = "../Admin/index.html";

                    } else {
                        window.location.href = "../Rider/index.html";
                    }
                }
            } catch (error) {
                console.log(error);
            }

        });
    } catch (error) {
        console.log(error);
    }
}
signUpForm.onsubmit = async (e) => {

    e.preventDefault();

    let response = await fetch('http://192.168.29.130:3000/user/register', {
        method: 'POST',
        body: new FormData(signUpForm)
    });

     let result = await response.json();

    window.location.href = "../Rider/auth.html";
};