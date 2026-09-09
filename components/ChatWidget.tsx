import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hey! I'm Twinkle's AI Assistant. Ask me anything about her work, skills, or startup goals!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API — skip the hardcoded greeting at index 0:
    // Gemini rejects a history whose first turn has role 'model'.
    const history = messages.slice(1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendChatMessage(userMsg.text, history);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-80 sm:w-96 bg-white border-4 border-black shadow-neo-xl flex flex-col h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-neo-blue p-3 border-b-4 border-black flex justify-between items-center">
            <h3 className="text-white font-bold text-lg font-mono">TWINKLE_AI.exe</h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="bg-red-500 w-8 h-8 border-2 border-black flex items-center justify-center font-bold text-white hover:bg-red-600"
            >
              X
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 border-2 border-black shadow-neo text-sm font-mono ${
                    msg.role === 'user' 
                      ? 'bg-neo-yellow' 
                      : 'bg-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 border-2 border-black shadow-neo text-sm font-mono animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t-4 border-black bg-neo-pink flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Chat message"
              placeholder="Ask about Twinkle..."
              className="flex-1 p-2 border-2 border-black font-mono focus:outline-none"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-neo-green px-4 py-2 border-2 border-black font-bold shadow-neo hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:bg-green-400"
            >
              SEND
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat with Twinkle's AI assistant"}
        className="pointer-events-auto group flex items-center gap-2"
      >
        <span className={`bg-black text-white px-2 py-1 font-mono text-sm border-2 border-white transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          Chat with Resume
        </span>
        <div className="w-16 h-16 bg-neo-yellow border-4 border-black shadow-neo-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
            <span className="text-2xl">🤖</span>
        </div>
      </button>
    </div>
  );
};

export default ChatWidget;