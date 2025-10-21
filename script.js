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
