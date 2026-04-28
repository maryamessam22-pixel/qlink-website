import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, ArrowUp, X, Loader2, Trash2, UserCircle } from 'lucide-react';
import { supabase } from '../../lib/Supabase';
import { LanguageContext } from '../../context/LanguageContext';
import './AiChat.css';

const IDENTITY_STORAGE_KEY = 'qlink_chat_identity';

const loadStoredIdentity = () => {
  try {
    const raw = localStorage.getItem(IDENTITY_STORAGE_KEY);
    if (!raw) return null;
    const j = JSON.parse(raw);
    if (j?.name && j?.email && j?.sessionId) {
      return {
        name: String(j.name).trim(),
        email: String(j.email).trim(),
        sessionId: String(j.sessionId).trim(),
      };
    }
  } catch {
  }
  return null;
};

const AiChat = ({ isOpen, onClose }) => {
  const { lang, t } = useContext(LanguageContext);
  const isAr = lang === 'ar';
  const getCurrentTime = useCallback(
    () => new Date().toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    [isAr]
  );
  const initialMessage = useMemo(
    () => ({
      id: 1,
      sender: 'bot',
      text: t('aiChat.initialMessage'),
      time: getCurrentTime(),
    }),
    [t, getCurrentTime]
  );
  const identityInit = useMemo(() => {
    const s = loadStoredIdentity();
    return s
      ? { phase: 'chat', name: s.name, email: s.email, sessionId: s.sessionId }
      : { phase: 'form', name: '', email: '', sessionId: '' };
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const messagesEndRef = useRef(null);

  const [gatePhase, setGatePhase] = useState(identityInit.phase);
  const [gateName, setGateName] = useState('');
  const [gateEmail, setGateEmail] = useState('');
  const [gateError, setGateError] = useState('');
  const [gateSubmitting, setGateSubmitting] = useState(false);

  const [userName, setUserName] = useState(identityInit.name);
  const [userEmail, setUserEmail] = useState(identityInit.email);
  const [sessionId, setSessionId] = useState(identityInit.sessionId);

  const clearIdentityAndGate = useCallback(() => {
    localStorage.removeItem(IDENTITY_STORAGE_KEY);
    setUserName('');
    setUserEmail('');
    setSessionId('');
    setMessages([initialMessage]);
    setGatePhase('form');
    setGateName('');
    setGateEmail('');
    setGateError('');
  }, [initialMessage]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const stored = loadStoredIdentity();
    if (stored) {
      setUserName(stored.name);
      setUserEmail(stored.email);
      setSessionId(stored.sessionId);
      setGatePhase('chat');
    } else {
      setGatePhase('form');
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, gatePhase]);

  const clearHistory = async () => {
    if (!window.confirm(t('aiChat.confirmClearHistory'))) return;
    if (!sessionId) return;
    const { error } = await supabase.from('chat_messages').delete().eq('session_id', sessionId);
    if (error) {
      console.error('Failed to clear chat history:', error);
      return;
    }
    setMessages([initialMessage]);
  };

  const handleGateSubmit = async (e) => {
    e.preventDefault();
    setGateError('');
    const name = gateName.trim();
    const email = gateEmail.trim();
    if (!name) {
      setGateError(t('aiChat.errors.enterName'));
      return;
    }
    if (!email) {
      setGateError(t('aiChat.errors.enterEmail'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGateError(t('aiChat.errors.invalidEmail'));
      return;
    }

    setGateSubmitting(true);
    const newSessionId = `sess_${crypto.randomUUID()}`;

    try {
      const { error: sessionErr } = await supabase.from('chat_sessions').insert({
        session_id: newSessionId,
        created_at: new Date().toISOString(),
      });

      if (sessionErr) {
        console.error(sessionErr);
        setGateError(sessionErr.message || t('aiChat.errors.sessionStartFailed'));
        setGateSubmitting(false);
        return;
      }

      localStorage.setItem(
        IDENTITY_STORAGE_KEY,
        JSON.stringify({ name, email, sessionId: newSessionId })
      );
      setUserName(name);
      setUserEmail(email);
      setSessionId(newSessionId);
      setMessages([initialMessage]);
      setGatePhase('chat');
    } catch (err) {
      console.error(err);
      setGateError(t('aiChat.errors.generic'));
    } finally {
      setGateSubmitting(false);
    }
  };

  const insertChatMessage = async (row) => {
    const payload = {
      sender: row.sender,
      text: row.text,
      session_id: sessionId,
      name: userName,
      email: userEmail,
      created_at: new Date().toISOString(),
      ...(row.model_used != null ? { model_used: row.model_used } : {}),
    };
    const { error } = await supabase.from('chat_messages').insert(payload);
    if (error) console.error('chat_messages insert:', error);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || !sessionId) return;

    const userText = inputValue.trim();
    setInputValue('');

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: userText,
        time: getCurrentTime()
      }
    ]);

    await insertChatMessage({ sender: 'user', text: userText });

    setIsTyping(true);

    try {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://vveftffbvwptlsqgeygp.supabase.co';
      const normalizedUrl = supabaseUrl.startsWith('http') ? supabaseUrl : `https://${supabaseUrl}`;
      const functionUrl = `${normalizedUrl.replace(/\/$/, '')}/functions/v1/ai-chat-proxy`;
      const authKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: authKey,
          Authorization: `Bearer ${authKey}`,
        },
        body: JSON.stringify({ message: userText, session_id: sessionId, lang: lang }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || `Edge Function returned status ${res.status}`);
      }

      const replyText = result.reply ?? '';
      const modelUsed = result.model_used ?? result.model ?? null;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          time: getCurrentTime()
        }
      ]);

      await insertChatMessage({
        sender: 'bot',
        text: replyText,
        model_used: modelUsed,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('AI chat error details:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `${t('aiChat.errors.servicePrefix')}${errorMessage}`,
          time: getCurrentTime()
        }
      ]);
      await insertChatMessage({ sender: 'bot', text: `${t('aiChat.errors.servicePrefix')}${errorMessage}`, model_used: null });
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  const overlay =
    gatePhase === 'form' ? (
      <div className="ai-chat-overlay" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="ai-chat-gate-card">
          <div className="ai-chat-gate-head">
            <div className="ai-gate-icon">
              <UserCircle size={28} />
            </div>
            <h2 className="ai-gate-title">{t('aiChat.startTitle')}</h2>
            <p className="ai-gate-sub">{t('aiChat.startSubtitle')}</p>
          </div>
          <form className="ai-chat-gate-form" onSubmit={handleGateSubmit}>
            {gateError && <div className="ai-gate-error" role="alert">{gateError}</div>}
            <label className="ai-gate-label" htmlFor="ai-gate-name">{t('aiChat.nameLabel')}</label>
            <input
              id="ai-gate-name"
              className="ai-gate-input"
              type="text"
              autoComplete="name"
              value={gateName}
              onChange={(e) => setGateName(e.target.value)}
              placeholder={t('aiChat.namePlaceholder')}
              disabled={gateSubmitting}
            />
            <label className="ai-gate-label" htmlFor="ai-gate-email">{t('aiChat.emailLabel')}</label>
            <input
              id="ai-gate-email"
              className="ai-gate-input"
              type="email"
              autoComplete="email"
              value={gateEmail}
              onChange={(e) => setGateEmail(e.target.value)}
              placeholder={t('aiChat.emailPlaceholder')}
              disabled={gateSubmitting}
            />
            <div className="ai-gate-actions">
              <button type="button" className="ai-gate-btn ai-gate-btn-secondary" onClick={onClose} disabled={gateSubmitting}>
                {t('aiChat.cancel')}
              </button>
              <button type="submit" className="ai-gate-btn ai-gate-btn-primary" disabled={gateSubmitting}>
                {gateSubmitting ? t('aiChat.pleaseWait') : t('aiChat.confirm')}
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div className="ai-chat-overlay" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="ai-chat-container">
          <div className="ai-chat-header">
            <div className="ai-header-left">
              <h2 className="ai-logo-text">Qlink</h2>
              <span className="ai-badge">{t('aiChat.badge')}</span>
            </div>
            <div className="ai-header-actions">
              <button
                type="button"
                className="ai-change-user-btn"
                onClick={clearIdentityAndGate}
                title={t('aiChat.changeUserTitle')}
              >
                {t('aiChat.changeUser')}
              </button>
              {messages.length > 1 && (
                <button className="ai-close-btn" onClick={clearHistory} title={t('aiChat.clearHistory')}>
                  <Trash2 size={20} />
                </button>
              )}
              <button className="ai-close-btn" onClick={onClose} title={t('aiChat.close')}>
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
                    <span className="ai-bot-name">{t('aiChat.botName')}</span>
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
                  <span className="ai-bot-name">{t('aiChat.botName')}</span>
                </div>
                <div className="ai-message-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Loader2 size={18} className="spin-animation" color="#888" />
                  <span style={{ color: '#888', fontStyle: 'italic', fontSize: '14px' }}>{t('aiChat.thinking')}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-footer">
            <form className="ai-input-wrapper" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder={t('aiChat.inputPlaceholder')}
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

  return createPortal(overlay, document.body);
};

export default AiChat;
