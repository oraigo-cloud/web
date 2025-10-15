
document.getElementById("subscribeForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  if (!email) {
    alert("Please enter a valid email!");
    return;
  }

  // Show countdown popup
  const popup = document.getElementById('subscribePopup');
  const timerEl = document.getElementById('subscribeTimer');
  popup.style.display = 'block';
  let count = 5;

  const interval = setInterval(() => {
    timerEl.textContent = count;
    count--;
    if (count < 0) {
      clearInterval(interval);
      popup.style.display = 'none';
    }
  }, 1000);

  // Send data to Apps Script
  const formData = new FormData();
  formData.append("Email", email);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwTD-eFAxrhw66YGX8BMEPkWTV05K5AQJfagBDvfeYLJknpTBJdVmjZjfElNTCW4mXdjA/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (text.includes("✅ Success")) {
      alert("✅ You are subscribed successfully!");
      form.reset();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
