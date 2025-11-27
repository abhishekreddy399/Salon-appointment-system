function login() {
    fetch("../api/auth/login.php", {
        method: "POST",
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location = data.user.role === "admin" ? "admin.html" : "index.html";
        } else {
            alert(data.error);
        }
    });
}

function register() {
    fetch("../api/auth/register.php", {
        method: "POST",
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message || data.error));
}
