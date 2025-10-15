document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  // Match all form field names
  formData.append("FullName", form.fullName.value);
  formData.append("Email", form.email.value);
  formData.append("Phone", form.phone.value);
  formData.append("Reason", form.reason.value);
  formData.append("Message", form.message.value);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwjbZ5Y9TarkzxRoepBdOxfNDRHWpUqLgunQCeTw9hUxfXO6lkrLmvSEtnfiHRoO_v5BA/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (text.includes("✅ Success")) {
      alert("✅ Thank you! Your message has been submitted successfully.");
      form.reset();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
