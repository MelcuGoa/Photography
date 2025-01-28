// Function to send data to Gotify
async function sendToGotify(event) {
    event.preventDefault(); // Prevent default form submission

    // Prevent multiple clicks from sending duplicate requests
    if (event.target.disabled) return;
    event.target.disabled = true; 

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Prepare the message content
    const gotifyMessage = `
Name: ${name}
Email: ${email}
Message: ${message}`;

    try {
        // Send the message to Gotify
        const response = await fetch("https://gotify.melcu.pro/message?token=AFe9TSjLNGtCm1S", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Mesaj nou pe photo.melcu.pro",
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
    } finally {
        event.target.disabled = false; // Re-enable button after request
    }
}

// Ensure event listener is only attached once
document.querySelector("form")?.removeEventListener("submit", sendToGotify);
document.querySelector("form")?.addEventListener("submit", sendToGotify);
