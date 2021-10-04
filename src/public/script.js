function formValidation() {
    password = document.getElementById("password").value;
    confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        document.getElementById("message").innerHTML = `<span>Password no coinciden</span>`;
        return false;
    } else {
        return true;
    }
}