import React, { useState, useRef, useEffect } from 'react';
import { askQuestion } from '../api';
import './QaChat.css';

const QaChat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'system',
      content: 'Welcome to the AI Insight Generator! Ask me anything about AI reskilling, workforce transformation, or the project itself. I\'m powered by DeepSeek V3.1 for cost-effective, intelligent responses.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askQuestion(inputValue);
      const aiMessage = {
        type: 'ai',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Error: ${error.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "What is the AI Insight Generator project?",
    "How does DeepSeek V3.1 compare to other AI models?",
    "What are the key features of this platform?",
    "How can I reskill for the AI economy?",
    "What industries are most affected by AI transformation?"
  ];

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <div className="qa-chat">
      <div className="chat-header">
        <h2>🤖 AI Q&A Chat</h2>
        <div className="model-badge">
          <span className="model-name">DeepSeek V3.1</span>
          <span className="model-params">685B params</span>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              {message.sources && (
                <div className="message-sources">
                  <strong>Sources:</strong> {message.sources.join(', ')}
                </div>
              )}
              <div className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai loading">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="loading-text">DeepSeek V3.1 is thinking...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="suggested-questions">
          <h4>Try asking:</h4>
          <div className="suggestions">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about AI reskilling, the project, or DeepSeek V3.1..."
            disabled={isLoading}
            className="chat-input"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QaChat;

