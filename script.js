document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("user-input");
  const chatContainer = document.getElementById("chat-container");

  const addMessage = (sender, text) => {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}-message flex items-start`;
    message.innerHTML = `
      <div class="bg-${sender === "bot" ? "blue" : "green"}-100 rounded-full p-2 flex-shrink-0">
        <i data-feather="${sender === "bot" ? "smile" : "user"}" class="text-${sender === "bot" ? "blue" : "green"}-600 w-4 h-4"></i>
      </div>
      <div class="ml-3 bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
        <div class="text-sm font-medium text-gray-900">${sender === "bot" ? "Profesor Bot" : "Tú"}</div>
        <p class="mt-1 text-sm text-gray-700 leading-relaxed">${text}</p>
      </div>
    `;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    feather.replace();
  };

  sendBtn.addEventListener("click", () => {
    const userText = input.value.trim();
    if (!userText) return;
    addMessage("user", userText);
    input.value = "";

    // Fake bot response (placeholder)
    setTimeout(() => {
      addMessage("bot", "¡Muy bien! Dime más sobre eso...");
    }, 800);
  });
});

// Sprachaufnahme initialisieren
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'es-ES';
recognition.interimResults = false;

const chatContainer = document.getElementById('chat-container');

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.classList.add('chat-message', sender === 'bot' ? 'bot-message' : 'user-message');
  div.innerHTML = `<div class="ml-3 text-sm text-gray-900">${text}</div>`;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Text an Backend senden
async function sendToChat(message) {
  appendMessage('user', message);

  try {
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    appendMessage('bot', data.reply);
    speak(data.reply);
  } catch (err) {
    console.error(err);
    appendMessage('bot', 'Error: keine Verbindung zum Server.');
  }
}

// Sprachausgabe
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  speechSynthesis.speak(utterance);
}

// Event-Listener Mikrofon
const voiceBtn = document.getElementById('voice-btn');
voiceBtn.addEventListener('click', () => recognition.start());

recognition.onresult = (event) => {
  const userText = event.results[0][0].transcript;
  sendToChat(userText);
};

// Event-Listener Textinput
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
sendBtn.addEventListener('click', () => {
  const text = userInput.value.trim();
  if (text) {
    sendToChat(text);
    userInput.value = '';
  }
});
