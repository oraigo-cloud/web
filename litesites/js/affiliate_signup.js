document.getElementById("affiliateSignupForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;

  // Show popup (no timer)
  const popup = document.getElementById('affiliatePopup');
  popup.style.display = 'block';

  // Automatically hide popup after 4 seconds
  setTimeout(() => {
    popup.style.display = 'none';
  }, 4000);

  // Collect form data
  const formData = new FormData();
  formData.append("Full Name", form.name.value);
  formData.append("Email", form.email.value);
  formData.append("WhatsApp / Contact Number", form.phone.value);
  formData.append("Social Media / Website Link", form.social.value);
  formData.append("UPI ID", form.upi.value);
  formData.append("Message", form.message.value);

  try {
    const response = await fetch("", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (text.includes("✅ Success")) {
      alert("✅ Your affiliate signup was submitted successfully!");
      form.reset();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
