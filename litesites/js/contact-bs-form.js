
document.getElementById("contactBusinessForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;

  // Show countdown popup
  const popup = document.getElementById('contactPopup');
  const timerEl = document.getElementById('contactTimer');
  popup.style.display = 'block';
  let count = 10;

  const interval = setInterval(() => {
    timerEl.textContent = count;
    count--;
    if (count < 0) {
      clearInterval(interval);
      popup.style.display = 'none';
    }
  }, 1000);

  const formData = new FormData();
  formData.append("Name", form.name.value);
  formData.append("Email", form.email.value);
  formData.append("Business", form.business.value);
  formData.append("Message", form.message.value);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycby64g9Xy8uZI0nRIsvUO374jSU20ds6T6PrX10EQXRrczHyc6QXgL33QAaEIVTRwdkX/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (text.includes("✅ Success")) {
      alert("✅ Your message was submitted successfully!");
      form.reset();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
