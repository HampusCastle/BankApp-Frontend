import { useState } from "react";
import axios from "axios";
import BackButton from "./BackButton";

interface ChatbotModalProps {
  onClose: () => void;
}

const ChatbotModal = ({ onClose }: ChatbotModalProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, `You: ${userInput}`];
    setMessages(newMessages);
    setLoading(true);
    setUserInput("");

    try {
      const response = await axios.post(
        "/chatbot/query",
        { query: userInput },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` } }
      );

      const botReply = response.data.message;
      setMessages([...newMessages, `Bot: ${botReply}`]);
    } catch {
      setMessages([...newMessages, "Bot: Sorry, something went wrong!"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-darkBg p-6 rounded-lg w-full max-w-md relative">
        <BackButton onCloseModal={onClose} />
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Chatbot</h2>
        <div className="max-h-80 overflow-y-auto mb-4 p-2 bg-gray-800 rounded">
          {messages.map((msg, index) => (
            <p key={index} className="text-white">{msg}</p>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-darkBg text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            placeholder="Ask a question..."
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-secondary focus:outline-none"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;