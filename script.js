document.getElementById("forgotPassword").addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;

    if (!email) {
    alert("Please enter your email first.");
    return;
    }

    const newPass = Math.random().toString(36).slice(-8);
    alert(`Temporary password sent to ${email}:\n${newPass}`);

    localStorage.setItem("tempPassword", newPass);
});