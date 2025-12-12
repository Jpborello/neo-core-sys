import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy Neo 🤖. ¿En qué puedo ayudarte a innovar hoy?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // REEMPLAZA ESTO CON TU URL DE WEBHOOK DE N8N (PRODUCCIÓN)
  const N8N_WEBHOOK_URL = "https://neo-core-sys.app.n8n.cloud/webhook/chat";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputText("");
    setIsLoading(true);

    try {
      // Enviar mensaje al webhook de n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: userMessage })
      });

      const data = await response.json();
      console.log("N8N RESPONSE:", data); // DEBUG LOG
      // Asumiendo que n8n devuelve { output: "Respuesta..." }
      const botReply = data.output || data.text || "Lo siento, tuve un problema de conexión.";

      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { text: "Lo siento, mis sistemas están recalibrando. Intenta de nuevo más tarde.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[380px] h-[550px] rounded-xl overflow-hidden glass-panel-dark flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-400/20 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.3)] bg-black/50">
                  <Bot className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-cyan-400 font-bold text-sm tracking-wider">NEO CORE SYS</h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                    SYSTEM ONLINE
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cyan-400/70 hover:text-cyan-400 hover:rotate-90 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user'
                        ? 'chat-bubble-user'
                        : 'chat-bubble-bot'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="chat-bubble-bot p-3 rounded-lg flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="terminal-input p-1">
              <div className="relative flex items-center">
                <span className="pl-3 text-cyan-400 select-none">{'>'}</span>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Insert command..."
                  className="w-full bg-transparent border-none py-4 px-2 text-white placeholder-gray-600 focus:outline-none focus:ring-0 font-mono text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-2 px-3 py-1 btn-send-glass rounded uppercase text-xs font-bold tracking-wider disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  SEND
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
            ? 'bg-black border-2 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)] rotate-45'
            : 'bg-black border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]'
          }`}
      >
        {isOpen ? (
          <X className="text-red-500" size={30} />
        ) : (
          <Bot className="text-cyan-400" size={32} />
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
