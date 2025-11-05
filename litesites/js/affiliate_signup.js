document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("affiliateSignupForm");

  if (!form) {
    console.error("❌ affiliateSignupForm not found.");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const popup = document.getElementById("affiliatePopup");

    // Change button to "Submitting..." and disable
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    submitButton.style.backgroundColor = "#a5b4fc"; // lighter purple
    submitButton.style.cursor = "not-allowed";

    // Collect form data
    const formData = new FormData();
    formData.append("Full Name", form.name.value);
    formData.append("Email", form.email.value);
    formData.append("WhatsApp / Contact Number", form.phone.value);
    formData.append("Social Media / Website Link", form.social.value);
    formData.append("UPI ID", form.upi.value);
    formData.append("Message", form.message.value);
    formData.append("Referral ID", form.refid.value);

    // Simulate 5-second delay before submission
    setTimeout(async () => {
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzSfjjymfRX-8X7rvo-OvpBdWEArAw5PSbI538ySLrhX1DccYzthYJ6GcW_8QZQ1GAr/exec", {
          method: "POST",
          body: formData
        });

        const text = await response.text();
        console.log("✅ Server response:", text);

        // Show popup (only if exists)
        if (popup) {
          popup.style.display = "block";
          setTimeout(() => (popup.style.display = "none"), 4000);
        }

        if (text.includes("✅ Success")) {
          alert("✅ Your affiliate signup was submitted successfully!");
          form.reset();
        } else {
          alert("⚠️ Something went wrong: " + text);
        }
      } catch (err) {
        console.error("❌ Error:", err);
        alert("❌ Error: " + err.message);
      } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
        submitButton.style.backgroundColor = "#4f46e5"; // original purple
        submitButton.style.cursor = "pointer";
      }
    }, 5000);
  });
});
