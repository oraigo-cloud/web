document.getElementById("affiliateSignupForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');

  // Change button to "Submitting..." and disable
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";
  submitButton.style.backgroundColor = "#a5b4fc"; // lighter shade of your purple
  submitButton.style.cursor = "not-allowed";

  // Collect form data
  const formData = new FormData();
  formData.append("Full Name", form.name.value);
  formData.append("Email", form.email.value);
  formData.append("WhatsApp / Contact Number", form.phone.value);
  formData.append("Social Media / Website Link", form.social.value);
  formData.append("UPI ID", form.upi.value);
  formData.append("Message", form.message.value);

  // Simulate form submission delay (5 seconds)
  setTimeout(async () => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzu5ThBI0ereOcljxiNMn53Qi9k6BGfTIKl_2hypFnTW2tcEzUCl13LSI-b8yqrqaGd/exec", {
        method: "POST",
        body: formData
      });

      const text = await response.text();
      console.log("Server response:", text);

      // Show popup
      const popup = document.getElementById('affiliatePopup');
      popup.style.display = 'block';

      setTimeout(() => {
        popup.style.display = 'none';
      }, 4000);

      if (text.includes("✅ Success")) {
        alert("✅ Your affiliate signup was submitted successfully!");
        form.reset();
      } else {
        alert("⚠️ Something went wrong: " + text);
      }
    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
      submitButton.style.backgroundColor = "#4f46e5"; // original color
      submitButton.style.cursor = "pointer";
    }
  }, 5000);
});
