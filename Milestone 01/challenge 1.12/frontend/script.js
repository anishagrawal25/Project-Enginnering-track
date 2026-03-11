// Conversation history array - keeps track of all messages in the session
const messages = [];

const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

/**
 * Renders a message bubble in the chat display
 * @param {string} role - 'user' or 'assistant'
 * @param {string} content - The message text
 */
function renderMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.innerText = content;
    
    messageDiv.appendChild(bubble);
    chatDisplay.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

/**
 * Handles the sending of a message
 */
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // 1. Add user message to local history
    messages.push({ role: "user", content: text });

    // 2. Render user bubble
    renderMessage('user', text);

    // 3. Clear input
    messageInput.value = '';

    // 4. Disable UI while waiting
    messageInput.disabled = true;
    sendBtn.disabled = true;

    try {
        // TODO: Call your backend /chat route here
        // Send the full `messages` array — not just the latest message
        // Hint: const response = await fetch('http://localhost:3000/chat', { 
        //   method: 'POST', 
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ messages }) 
        // });
        // const data = await response.json();
        
        // On response: add { role: 'assistant', content: data.reply } to messages
        // Render the assistant bubble in chatDisplay: renderMessage('assistant', data.reply)
        
        console.log("Waiting for student to implement fetch call...");
        
    } catch (error) {
        console.error("Error sending message:", error);
        renderMessage('assistant', "Error: Could not connect to the server. Make sure your backend is running!");
    } finally {
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageInput.focus();
    }
}

// Wire up events
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
