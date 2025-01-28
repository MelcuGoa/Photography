  // Function to send data to Gotify
  async function sendToGotify(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Prepare the message content
    const gotifyMessage = `New Contact Form Submission:
Name: ${name}
Email: ${email}
Message: ${message}`;

    try {
      // Send the message to Gotify
      const response = await fetch("https://gotify.melcu.pro/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Gotify-Key": "AFe9TSjLNGtCm1S", // Replace with your Gotify Application Token
        },
        body: JSON.stringify({
          title: "Contact Form Submission",
          message: gotifyMessage,
          priority: 0, // Optional: Set priority (default is 0)
        }),
      });

      if (response.ok) {
        alert("Message sent to Gotify successfully!");
      } else {
        console.error("Failed to send message:", response.statusText);
        alert("Failed to send the message to Gotify.");
      }
    } catch (error) {
      console.error("Error sending message to Gotify:", error);
      alert("An error occurred while sending the message.");
    }
  }

  // Attach the event listener to the form
  document.querySelector("form").addEventListener("submit", sendToGotify);
