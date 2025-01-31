const socket = io();

// Elements for chat functionality
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const connectionsList = document.getElementById("connections-list");
const chatProfileName = document.getElementById("chat-profile-name");
const chatProfileImage = document.getElementById("chat-profile-image");

// Track the selected profile for chat
let selectedProfile = null;

// Sample potential connections data (hardcoded)
const potentialConnections = [
  { name: "Priyanka", avatar: "E:/GrowHerFinal/user4.jpg", id: "userA" },
  { name: "Rhea", avatar: "E:/GrowHerFinal/user5.webp", id: "userB" },
  { name: "Mary Johnson", avatar: "E:/GrowHerFinal/user6.jpg", id: "userC" },
];

// Function to display potential connections
function displayPotentialConnections() {
  // Clear previous connections
  connectionsList.innerHTML = "";

  // Loop through potential connections and add to the list
  potentialConnections.forEach((connection) => {
    const connectionElement = document.createElement("li");
    connectionElement.classList.add("connection-item");
    connectionElement.setAttribute("data-profile", connection.id);
    connectionElement.innerHTML = `
      <img src="${connection.avatar}" alt="${connection.name}'s avatar" class="profile-image">
      <span class="name">${connection.name}</span>
      <button class="connect-btn" onclick="connectUser('${connection.id}')">Connect</button>
    `;

    // Append the connection element to the connections list
    connectionsList.appendChild(connectionElement);
  });
}

// Function to simulate connecting with a user
function connectUser(userId) {
  const user = potentialConnections.find((u) => u.id === userId);
  if (user) {
    // Remove the user from potential connections
    const userElement = document.querySelector(`li[data-profile="${userId}"]`);
    if (userElement) {
      userElement.remove();
    }

    // Add the user to the connected users list
    const connectedUserElement = document.createElement("li");
    connectedUserElement.setAttribute("data-profile", userId);
    connectedUserElement.innerHTML = `
      <img src="${user.avatar}" alt="${user.name}'s avatar" class="profile-image">
      <span class="name">${user.name}</span>
    `;
    document.querySelector(".profile-list").appendChild(connectedUserElement);

    alert(`You connected with ${user.name}!`);
  }
}

// Function to format timestamp
function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Handle profile selection
document.querySelectorAll(".profile-list li").forEach((profile) => {
  profile.addEventListener("click", () => {
    const profileName = profile.textContent.trim();
    const profileImage = profile.querySelector(".profile-image").src;

    // Update chat header
    chatProfileName.textContent = profileName;
    chatProfileImage.src = profileImage;

    // Set the selected profile
    selectedProfile = profile.getAttribute("data-profile");
  });
});

// Listen for incoming messages
socket.on("receiveMessage", (data) => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  if (data.sender === username) {
    messageElement.classList.add("sent");
  } else {
    messageElement.classList.add("received");
  }

  // Add timestamp
  const timestamp = getTimestamp();
  messageElement.innerHTML = `
    <strong>${data.sender}: </strong>${data.message}
    <span class="timestamp">${timestamp}</span>
  `;

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Send a message
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message && selectedProfile) {
    const timestamp = getTimestamp();

    // Display the sent message immediately in the chatbox
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "sent");
    messageElement.innerHTML = `
      <strong>You: </strong>${message}
      <span class="timestamp">${timestamp}</span>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Emit the message to the server
    socket.emit("sendMessage", {
      sender: username,
      message: message,
      timestamp: timestamp,
      recipient: selectedProfile, // Send to the selected profile
    });

    // Clear the input field
    messageInput.value = "";
  } else {
    alert("Please select a profile to chat with.");
  }
});

// Handle Enter key press
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

// Initialize the potential connections list when page loads
window.onload = function () {
  displayPotentialConnections(); // Display the hardcoded sample connections
};