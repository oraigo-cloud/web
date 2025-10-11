document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  // Combine first and last name
  formData.append("Name", form.name.value);
  formData.append("Email", form.email.value);
  formData.append("Message", form.message.value);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzdRfNhORmL_zpCovdf2CHo_-y9zE7qmkWpR65FHx29sAMBIYrNHoEZSFcciaTXj19R/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (text.includes("✅ Success")) {
      alert("✅ Your message has been sent successfully!");
      form.reset();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
