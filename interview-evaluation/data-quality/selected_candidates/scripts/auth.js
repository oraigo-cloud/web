(function () {

    // Skip login if already authenticated
    if (sessionStorage.getItem("dashboardAuth") === "true") {
        hideOverlay();
    }

    window.checkAccess = function () {
        const email = document.getElementById("emailInput").value.trim().toLowerCase();
        const password = document.getElementById("passwordInput").value.trim();

        if (!email || !password || !email.includes("@")) {
            showError();
            return;
        }

        const expectedPassword = generatePassword(email);

        if (password === expectedPassword) {
            sessionStorage.setItem("dashboardAuth", "true");
            hideOverlay();
        } else {
            showError();
        }
    };

    function generatePassword(email) {
        const [username, domain] = email.split("@");
        const company = domain.split(".")[0];

        const userPart = capitalize(username.substring(0, 4));
        const companyPart = capitalize(company.substring(0, 4));

        return userPart + companyPart;
    }

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    function hideOverlay() {
        const overlay = document.getElementById("authOverlay");
        if (overlay) overlay.style.display = "none";
    }

    function showError() {
        document.getElementById("errorMsg").style.display = "block";
    }

})();

