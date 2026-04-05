import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, X, Loader2 } from 'lucide-react';
import './AiChat.css'; 


const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const AiChat = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm your Qlink AI Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userText) => {
    setIsTyping(true);
    
    try {
      if (!GEMINI_API_KEY) {
        throw new Error("API key is missing! Please configure REACT_APP_GEMINI_API_KEY.");
      }
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Qlink Safety Bot, a professional AI assistant for Qlink (a smart emergency medical bracelet). Answer this briefly: ${userText}`
            }]
          }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }
      
      if (data.candidates && data.candidates[0].content) {
        const botReply = data.candidates[0].content.parts[0].text;
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'bot',
        text: "I'm having trouble connecting. Error: " + error.message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setInputValue('');
    await generateAIResponse(userText);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-container">
        
        <div className="ai-chat-header">
          <div className="ai-header-left">
            <h2 className="ai-logo-text">Qlink</h2>
            <span className="ai-badge">AI Assistant</span>
          </div>
          <button className="ai-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="ai-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-message-wrapper ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="ai-bot-identity">
                  <div className="ai-bot-icon">
                    <Sparkles size={16} color="white" />
                  </div>
                  <span className="ai-bot-name">Qlink Safety Bot</span>
                </div>
              )}
              <div className={`ai-message-bubble ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
              <span className={`ai-message-time ${msg.sender}`}>{msg.time}</span>
            </div>
          ))}
          
          {isTyping && (
            <div className="ai-message-wrapper bot">
              <div className="ai-bot-identity">
                <div className="ai-bot-icon">
                  <Sparkles size={16} color="white" />
                </div>
                <span className="ai-bot-name">Qlink Safety Bot</span>
              </div>
              <div className="ai-message-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={18} className="spin-animation" color="#888" />
                <span style={{ color: '#888', fontStyle: 'italic', fontSize: '14px' }}>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-chat-footer">
          <form className="ai-input-wrapper" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask about Qlink safety..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className={`ai-send-btn ${inputValue.trim() && !isTyping ? 'active' : ''}`}
              disabled={!inputValue.trim() || isTyping}
            >
              <ArrowUp size={20} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AiChat;