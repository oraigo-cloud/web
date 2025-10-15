document.getElementById("bookingForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  // Match all form field names exactly
  formData.append("FullName", form.fullName.value);
  formData.append("Email", form.email.value);
  formData.append("Phone", form.phone.value);
  formData.append("Destination", form.destination.value);
  formData.append("Date", form.date.value);
  formData.append("Travellers", form.travellers.value);
  formData.append("Notes", form.notes.value);

  alert('Thank you for contacting Adventure Saathi! We will reach out soon.');


  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz15jkIZpAFfwDM5QVVCUKTx7b4xfNTrz2SGJPaE4e9pwKf8py73Hd6IeLoG3_mf02u/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (text.includes("✅ Success")) {
      alert("✅ Your booking request was submitted successfully!");
      form.reset();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});