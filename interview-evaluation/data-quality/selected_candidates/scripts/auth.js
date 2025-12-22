(function () {
    // Change password here if needed
    const CORRECT_PASSWORD = "SagaXbit";

    // If already authenticated in this session, skip login
    if (sessionStorage.getItem("dashboardAuth") === "true") {
        hideOverlay();
    }

    window.checkPassword = function () {
        const input = document.getElementById("passwordInput").value;

        if (input === CORRECT_PASSWORD) {
            sessionStorage.setItem("dashboardAuth", "true");
            hideOverlay();
        } else {
            document.getElementById("errorMsg").style.display = "block";
        }
    };

    function hideOverlay() {
        const overlay = document.getElementById("authOverlay");
        if (overlay) overlay.style.display = "none";
    }
})();

