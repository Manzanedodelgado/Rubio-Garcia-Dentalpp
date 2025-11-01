import React, { useEffect, useState } from 'react';
import { Send, Phone } from 'lucide-react';
import { conversationsAPI, whatsappAPI } from '../services/api';

export default function Mensajeria() {
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConv) {
      loadMessages(selectedConv._id);
    }
  }, [selectedConv]);

  const loadConversations = async () => {
    try {
      const response = await conversationsAPI.list();
      setConversations(response.data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (convId) => {
    try {
      const response = await conversationsAPI.messages(convId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConv) return;

    try {
      await conversationsAPI.sendMessage(selectedConv._id, {
        conversation_id: selectedConv._id,
        type: 'text',
        content: newMessage,
        sender: 'clinic',
        sent_at: new Date()
      });
      
      setNewMessage('');
      loadMessages(selectedConv._id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'yellow': return 'border-yellow-400 bg-yellow-50';
      case 'blue': return 'border-blue-400 bg-blue-50';
      case 'green': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="h-screen flex">
      {/* Lista de conversaciones */}
      <div className="w-80 border-r border-neutral-100 bg-white">
        <div className="p-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-900">Conversaciones</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {conversations.map((conv) => (
            <button
              key={conv._id}
              onClick={() => setSelectedConv(conv)}
              className={`w-full p-4 border-l-4 ${getStatusColor(conv.status)} ${
                selectedConv?._id === conv._id ? 'bg-opacity-100' : 'bg-opacity-50 hover:bg-opacity-75'
              } transition-all text-left`}
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-neutral-600" />
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{conv.whatsapp_number}</p>
                  <p className="text-xs text-neutral-600 mt-1">{new Date(conv.last_message_at).toLocaleString('es-ES')}</p>
                </div>
                <span className={`w-3 h-3 rounded-full ${
                  conv.status === 'yellow' ? 'bg-yellow-500' :
                  conv.status === 'blue' ? 'bg-blue-500' :
                  conv.status === 'green' ? 'bg-green-500' :
                  'bg-gray-500'
                }`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat activo */}
      <div className="flex-1 flex flex-col bg-neutral-50">
        {selectedConv ? (
          <>
            <div className="h-16 bg-white border-b border-neutral-100 flex items-center px-6">
              <h2 className="text-lg font-semibold text-neutral-900">{selectedConv.whatsapp_number}</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.sender === 'clinic' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md px-4 py-3 rounded-lg ${
                    msg.sender === 'clinic'
                      ? 'bg-primary-500 text-white'
                      : msg.sender === 'ai'
                      ? 'bg-accent-400 text-neutral-900'
                      : 'bg-white text-neutral-900 border border-neutral-200'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'clinic' ? 'text-primary-100' : 'text-neutral-600'}`}>
                      {new Date(msg.sent_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="input-base flex-1"
                />
                <button onClick={sendMessage} className="btn-primary">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-600">
            Selecciona una conversacion para ver los mensajes
          </div>
        )}
      </div>
    </div>
  );
}
