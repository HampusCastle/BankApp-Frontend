import { useState } from 'react';
import ChatbotModal from './ChatbotModal';

const ChatbotIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatbotClick = () => {
    setIsModalOpen(true); 
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-6 cursor-pointer p-4 bg-primary text-white rounded-full shadow-lg hover:bg-secondary transition"
        onClick={handleChatbotClick}
        title="Chat with us"
      >
        <span role="img" aria-label="Chatbot" className="text-2xl">🤖</span>
      </div>

      {/* Chatbot Modal */}
      {isModalOpen && <ChatbotModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ChatbotIcon;