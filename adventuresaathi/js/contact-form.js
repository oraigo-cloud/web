function startCountdown() {
  const popup = document.getElementById('countdownPopup2');
  const timerEl = document.getElementById('timer2');
  let count = 5;

  popup.style.display = 'block';

  const interval = setInterval(() => {
    timerEl.textContent = count;
    count--;
    if (count < 0) {
      clearInterval(interval);
      popup.style.display = 'none';
      //alert("✅ You’re all set! We will contact you shortly.");
    }
  }, 1000);
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
