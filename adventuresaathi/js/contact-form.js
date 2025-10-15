function showCountdownAlert() {
  const baseMessage = "Thank you for contacting Adventure Saathi! We will reach out soon.\nPlease wait for a few seconds ..\n";
  let count = 10;

  function showNext() {
    if (count > 0) {
      alert(baseMessage + count);
      count--;
      showNext(); // recursive call
    } else {
      alert("✅ You’re all set! We will contact you shortly.");
    }
  }

  showNext();
}

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

  startCountdown();

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbynxcjVf3YMMkWxkpfjYSk7YAOE0h6UWfaLfWAoOchKkuOletnqRt5mjJKTUGGWxYKmww/exec", {
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
