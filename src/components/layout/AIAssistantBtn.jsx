import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import AiChat from '../../pages/AI/AiChat';
import './ArrowUp.css'; 

const AIAssistantBtn = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="ai-btn-container">
        <button 
          className="floating-btn" 
          aria-label="Ask AI Assistant"
          onClick={() => setIsChatOpen(true)}
        >
          <Sparkles size={24} />
        </button>
      </div>

    
      <AiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default AIAssistantBtn;