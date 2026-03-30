import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './ArrowUp.css';

const AIAssistantBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="ai-btn-container">
      <button 
        className="floating-btn" 
        aria-label="Ask AI Assistant"
        onClick={() => navigate('/ai')}
      >
        <Sparkles size={24} />
      </button>
    </div>
  );
};

export default AIAssistantBtn;
