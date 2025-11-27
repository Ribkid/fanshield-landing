(function() {
  // Prevent duplicate initialization
  if (window.ChatAssistInitialized) return;
  window.ChatAssistInitialized = true;

  function init() {
    const config = window.ChatAssistConfig || {};
    const chatbotId = config.chatbotId;
    // Use current origin if not specified (for local dev), otherwise production URL
    const baseUrl = document.currentScript?.src 
      ? new URL(document.currentScript.src).origin 
      : "http://localhost:3000";

    if (!chatbotId) {
      console.error('ChatAssist: chatbotId is required');
      return;
    }

    // Create widget container
    const container = document.createElement('div');
    container.id = 'chatassist-widget';
    document.body.appendChild(container);

    // Load styles asynchronously
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = `${baseUrl}/widget.css`;
    styles.media = 'print'; // Load for print first (non-blocking)
    styles.onload = () => { styles.media = 'all'; }; // Switch to all when loaded
    document.head.appendChild(styles);

    // Initialize widget
    let sessionId = localStorage.getItem('chatassist_session');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatassist_session', sessionId);
    }

    // Fetch chatbot config
    fetch(`${baseUrl}/api/widget/${chatbotId}`)
      .then(res => res.json())
      .then(chatbotConfig => {
        renderWidget(chatbotConfig, sessionId);
      })
      .catch(err => {
        console.error('ChatAssist: Failed to load widget', err);
      });

    function renderWidget(chatbotConfig, sessionId) {
      const { welcomeMessage, primaryColor, name, position } = chatbotConfig;
      
      // Handle position
      const positionClass = position === 'bottom-left' ? 'left' : 'right';
      
      container.innerHTML = `
        <div class="chatassist-bubble ${positionClass}" style="background: ${primaryColor}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div class="chatassist-window ${positionClass}" style="--primary: ${primaryColor}">
          <div class="chatassist-header">
            <h3>${name}</h3>
            <button class="chatassist-close">×</button>
          </div>
          <div class="chatassist-messages">
            <div class="chatassist-message assistant">
              ${welcomeMessage}
            </div>
          </div>
          <form class="chatassist-input">
            <input type="text" placeholder="Type a message..." />
            <button type="submit">Send</button>
          </form>
        </div>
      `;

      // Event handlers
      const bubble = container.querySelector('.chatassist-bubble');
      const windowEl = container.querySelector('.chatassist-window');
      const closeBtn = container.querySelector('.chatassist-close');
      const form = container.querySelector('.chatassist-input');
      const input = form.querySelector('input');
      const messagesContainer = container.querySelector('.chatassist-messages');
      const submitBtn = form.querySelector('button');

      bubble.addEventListener('click', () => {
        windowEl.classList.add('open');
        bubble.classList.add('hidden');
      });

      closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('open');
        bubble.classList.remove('hidden');
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage('user', message);
        input.value = '';
        submitBtn.disabled = true;

        // Send to API and stream response
        await sendMessage(chatbotId, sessionId, message, messagesContainer, submitBtn, baseUrl);
      });
    }

    async function sendMessage(chatbotId, sessionId, message, container, submitBtn, baseUrl) {
      try {
        const response = await fetch(`${baseUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            chatbotId, 
            sessionId, 
            messages: [{ role: 'user', content: message }] 
          }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'chatassist-message assistant';
        container.appendChild(assistantMsg);
        container.scrollTop = container.scrollHeight;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantMsg.textContent += chunk;
          container.scrollTop = container.scrollHeight;
        }
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage('assistant', 'Sorry, something went wrong. Please try again.');
      } finally {
        submitBtn.disabled = false;
      }
    }

    function addMessage(role, content) {
      const container = document.querySelector('.chatassist-messages');
      const msg = document.createElement('div');
      msg.className = `chatassist-message ${role}`;
      msg.textContent = content;
      container.appendChild(msg);
      container.scrollTop = container.scrollHeight;
    }
  }

  // Defer initialization
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Use requestIdleCallback if available, otherwise setTimeout
    if (window.requestIdleCallback) {
      window.requestIdleCallback(init);
    } else {
      setTimeout(init, 1);
    }
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }
})();
