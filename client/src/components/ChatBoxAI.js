import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai';
import { FaRobot } from 'react-icons/fa';

const ChatBoxAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý AI của Phongtro123. Tôi có thể giúp gì cho bạn? Hãy hỏi tôi về thuê phòng trọ, giá cả, khu vực, hoặc bất kỳ thông tin nào bạn cần!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Thêm tin nhắn của user
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Kiểm tra API key
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key chưa được cấu hình');
      }

      console.log('🤖 Gọi Gemini API...');
      
      // Gọi API Gemini với prompt được tối ưu cho dự án phongtro
      const systemPrompt = `Bạn là trợ lý AI thông minh của website Phongtro123.com - nền tảng cho thuê phòng trọ hàng đầu Việt Nam.

NHIỆM VỤ CỦA BẠN:
- Tư vấn về thuê phòng trọ, nhà trọ, căn hộ, mặt bằng
- Hướng dẫn sử dụng website (tìm kiếm, đăng tin, thanh toán)
- Tư vấn giá thuê phòng theo khu vực
- Gợi ý địa điểm cho thuê phù hợp
- Giải đáp thắc mắc về hợp đồng, quy định
- Hỗ trợ người dùng tìm phòng trọ phù hợp với nhu cầu

PHONG CÁCH TRẢ LỜI:
- Thân thiện, nhiệt tình, chuyên nghiệp
- Ngắn gọn, súc tích (2-4 câu)
- Sử dụng emoji phù hợp
- Đưa ra gợi ý cụ thể

Câu hỏi của người dùng: ${userMessage}`;
      
      const MODEL = 'gemini-2.5-flash';

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: systemPrompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      console.log('📡 Status:', response.status);
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.error?.message || 'Lỗi không xác định';
        throw new Error(`API Error: ${errorMsg}`);
      }
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      } else {
        throw new Error('Không nhận được phản hồi hợp lệ');
      }
    } catch (error) {
      console.error('❌ Lỗi:', error);
      
      let errorMessage = 'Xin lỗi, tôi gặp sự cố. Vui lòng thử lại! 😔';
      
      if (error.message.includes('API key')) {
        errorMessage = '⚠️ Cần cấu hình API key trong file .env\nThêm dòng: REACT_APP_GEMINI_API_KEY=your_key_here';
      } else if (error.message.includes('API_KEY_INVALID')) {
        errorMessage = '⚠️ API key không hợp lệ. Lấy key mới tại: https://aistudio.google.com/app/apikey';
      } else if (error.message.includes('quota')) {
        errorMessage = '⚠️ Đã vượt giới hạn API miễn phí. Vui lòng thử lại sau!';
      } else if (error.message.includes('fetch')) {
        errorMessage = '⚠️ Lỗi kết nối. Kiểm tra internet của bạn!';
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Gợi ý câu hỏi mẫu
  const quickQuestions = [
    "Tìm phòng trọ giá rẻ",
    "Cách đăng tin",
    "Giá thuê trung bình"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-bounce"
          title="Chat với AI Gemini"
        >
          <FaRobot className="text-3xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            AI
          </span>
        </button>
      )}

      {/* Cửa sổ Chat */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden" style={{ height: '550px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaRobot className="text-2xl animate-pulse" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Trợ lý AI</h3>
                <p className="text-xs opacity-90">Powered by Gemini ✨</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              title="Đóng"
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-md p-4 rounded-2xl rounded-bl-none border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Gợi ý nhanh */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-50 border-t">
              <p className="text-xs text-gray-500 mb-2">💡 Gợi ý câu hỏi:</p>
              <div className="flex gap-2 flex-wrap">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs bg-white hover:bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 transition-all shadow-md hover:shadow-lg"
                title="Gửi"
              >
                <AiOutlineSend className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBoxAI;
