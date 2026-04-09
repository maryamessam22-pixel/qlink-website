import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, X, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/Supabase';
import './AiChat.css';

const getSessionId = () => {
  let id = localStorage.getItem('qlink_session_id');
  if (!id) {
    id = `sess_${crypto.randomUUID()}`;
    localStorage.setItem('qlink_session_id', id);
  }
  return id;
};

const INITIAL_MESSAGE = {
  id: 1,
  sender: 'bot',
  text: "Hello! I'm your Qlink AI Assistant. How can I help you today?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const AiChat = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(getSessionId()).current;

  const clearHistory = async () => {
    if (!window.confirm('Clear all chat history?')) return;
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('session_id', sessionId);

    if (error) {
      console.error('Failed to clear chat history:', error);
      return;
    }
    setMessages([INITIAL_MESSAGE]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    setIsTyping(true);

    try {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://vveftffbvwptlsqqeygp.supabase.co';
      const normalizedUrl = supabaseUrl.startsWith('http') ? supabaseUrl : `https://${supabaseUrl}`;
      const functionUrl = `${normalizedUrl.replace(/\/$/, '')}/functions/v1/ai-chat-proxy`;
      const authKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      // مراقبة البيانات قبل الإرسال
      console.log("1. Input being sent to Bot:", userText); 
      console.log("2. Target URL:", functionUrl);

      const res = await fetch(functionUrl, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: authKey,
          Authorization: `Bearer ${authKey}`,
        },
        body: JSON.stringify({ message: userText, session_id: sessionId }),
      });

      const result = await res.json();
      
      // مراقبة الرد
      console.log("3. Full API Response:", result);

      if (!res.ok) {
        throw new Error(result.error || `Edge Function returned status ${res.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: result.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('AI chat error details:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Service error: ${errorMessage}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
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
          <div style={{ display: 'flex', gap: '8px' }}>
            {messages.length > 1 && (
              <button className="ai-close-btn" onClick={clearHistory} title="Clear Chat History">
                <Trash2 size={20} />
              </button>
            )}
            <button className="ai-close-btn" onClick={onClose} title="Close Chat">
              <X size={24} />
            </button>
          </div>
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
          <form className="ai-input-wrapper" onSubmit={sendMessage}>
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