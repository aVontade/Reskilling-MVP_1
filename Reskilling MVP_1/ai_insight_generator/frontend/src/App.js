import React, { useState, useEffect } from 'react';
import QaChat from './components/QaChat';
import VisualizationGenerator from './components/VisualizationGenerator';
import { checkHealth } from './api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('qa');
  const [backendStatus, setBackendStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const status = await checkHealth();
        setBackendStatus(status);
      } catch (error) {
        setBackendStatus({ status: 'error', message: 'Backend unavailable' });
      } finally {
        setIsLoading(false);
      }
    };

    checkBackendHealth();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="title-section">
            <h1>🚀 AI Insight Generator</h1>
            <p>Transform static content into interactive AI-powered experiences</p>
          </div>
          <div className="status-section">
            {isLoading ? (
              <div className="status loading">
                <span className="status-dot"></span>
                Connecting...
              </div>
            ) : backendStatus?.status === 'healthy' ? (
              <div className="status healthy">
                <span className="status-dot"></span>
                <div className="status-info">
                  <div className="status-text">
                    {backendStatus.ai_model} Ready
                  </div>
                  <div className="status-subtext">
                    {backendStatus.demo_mode ? 'Demo Mode' : 'Live API'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="status error">
                <span className="status-dot"></span>
                Backend Offline
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <div className="nav-content">
          <button
            className={`nav-tab ${activeTab === 'qa' ? 'active' : ''}`}
            onClick={() => setActiveTab('qa')}
          >
            <span className="tab-icon">🤖</span>
            <span className="tab-text">AI Q&A Chat</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'viz' ? 'active' : ''}`}
            onClick={() => setActiveTab('viz')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-text">Visualization Generator</span>
          </button>
        </div>
      </nav>

      <main className="app-main">
        <div className="main-content">
          {backendStatus?.demo_mode && (
            <div className="demo-banner">
              <div className="demo-content">
                <span className="demo-icon">🎭</span>
                <div className="demo-text">
                  <strong>Demo Mode Active</strong>
                  <p>Configure your DeepSeek API key in the backend .env file for full AI functionality</p>
                </div>
              </div>
            </div>
          )}

          <div className="tab-content">
            {activeTab === 'qa' && <QaChat />}
            {activeTab === 'viz' && <VisualizationGenerator />}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🧠 Powered by DeepSeek V3.1</h4>
            <p>685 billion parameter model for cost-effective AI processing</p>
          </div>
          <div className="footer-section">
            <h4>🎯 Features</h4>
            <ul>
              <li>AI-powered Q&A system</li>
              <li>Dynamic visualization generation</li>
              <li>Interactive Vega-Lite charts</li>
              <li>Cost-effective processing</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>📊 Technology Stack</h4>
            <ul>
              <li>React Frontend</li>
              <li>Flask Backend</li>
              <li>DeepSeek V3.1 API</li>
              <li>Vega-Lite Visualizations</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AI Insight Generator - Transforming content with AI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

