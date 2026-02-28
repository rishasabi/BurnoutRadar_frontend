import { useState } from 'react';
import { sendMessage } from '../utils/chatbot';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    const reply = await sendMessage(input, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="chatbot-wrapper">
      {open ? (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="close-btn" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type something..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>💬</button>
      )}

      <style>{`
        .chatbot-wrapper { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
        .chatbot-toggle { background:#007bff;color:#fff;border:none;border-radius:50%;width:60px;height:60px;font-size:28px;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.3); }
        .chatbot-container { width:300px;max-height:400px;display:flex;flex-direction:column;background:#fff;border:1px solid #ccc;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.2); }
        .chatbot-header { display:flex;justify-content:space-between;align-items:center;padding:8px;background:#007bff;color:#fff;border-top-left-radius:8px;border-top-right-radius:8px; }
        .close-btn { background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer; }
        .messages { flex:1;padding:8px;overflow-y:auto; }
        .message { margin-bottom:6px;padding:6px 8px;border-radius:4px; }
        .message.user { background:#e1f5fe;align-self:flex-end; }
        .message.assistant { background:#f1f1f1;align-self:flex-start; }
        .chatbot-input { display:flex;padding:8px;border-top:1px solid #ddd; }
        .chatbot-input input { flex:1;padding:6px;border:1px solid #ccc;border-radius:4px;margin-right:4px; }
        .chatbot-input button { background:#007bff;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer; }
      `}</style>
    </div>
  );
}