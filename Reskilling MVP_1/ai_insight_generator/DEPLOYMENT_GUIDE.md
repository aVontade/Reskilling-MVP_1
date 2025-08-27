# AI Insight Generator - Deployment Guide

## 🚀 Overview

The AI Insight Generator is a modern web application that transforms static content into interactive AI-powered experiences. Built with React frontend and Flask backend, it integrates with DeepSeek V3.1 for cost-effective AI processing.

## 🏗️ Architecture

```
AI Insight Generator/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── data/               # Project documentation
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Environment configuration
│   └── venv/              # Python virtual environment
└── frontend/               # React web application
    ├── src/               # Source code
    ├── build/             # Production build
    ├── package.json       # Node.js dependencies
    └── public/            # Static assets
```

## 🔧 Prerequisites

- Python 3.11+
- Node.js 18+
- DeepSeek API key (optional, demo mode available)

## 📦 Installation

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd ai_insight_generator/backend
   ```

2. **Create virtual environment:**
   ```bash
   python3.11 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   # Edit .env file
   DEEPSEEK_API_KEY=your-actual-deepseek-api-key-here
   ```

5. **Start the backend server:**
   ```bash
   python app.py
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ai_insight_generator/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   Application will open at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Production Deployment

### Frontend Deployment
The React frontend has been built and packaged for deployment. The production build is available in the `frontend/build` directory and has been packaged for easy deployment.

### Backend Deployment
The Flask backend is configured for production deployment with:
- CORS enabled for cross-origin requests
- Environment variable configuration
- Demo mode fallback when API key is not available

## 🔑 DeepSeek V3.1 Integration

### Getting Your API Key
1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Add it to your `.env` file

### Cost Benefits
- **DeepSeek V3.1**: 685 billion parameters at fraction of GPT cost
- **Efficient Processing**: Optimized for cost-effective AI operations
- **Demo Mode**: Test functionality without API costs

## 🎯 Features

### AI Q&A System
- Real-time chat interface
- Context-aware responses about AI reskilling
- Predefined question suggestions
- Error handling and fallback responses

### Visualization Generator
- Interactive chart creation
- Vega-Lite powered visualizations
- Industry-specific examples
- AI-generated data visualizations

### User Experience
- Modern, responsive design
- Mobile-friendly interface
- Real-time status monitoring
- Professional gradient styling

## 🛠️ API Endpoints

### Health Check
```
GET /api/health
Response: {
  "status": "healthy",
  "service": "AI Insight Generator Backend",
  "ai_model": "DeepSeek V3.1",
  "demo_mode": false,
  "message": "Using DeepSeek V3.1 - 685B parameter cost-effective model"
}
```

### Q&A System
```
POST /api/qa
Body: { "question": "Your question here" }
Response: { "answer": "AI-generated response" }
```

### Visualization Generation
```
POST /api/visualization
Body: { "description": "Chart description" }
Response: { "vega_spec": {...}, "description": "..." }
```

## 🔍 Troubleshooting

### Common Issues

1. **Backend not starting:**
   - Check Python version (3.11+ required)
   - Verify virtual environment activation
   - Install missing dependencies

2. **API authentication errors:**
   - Verify DeepSeek API key in `.env` file
   - Check API key validity on DeepSeek platform
   - Demo mode will activate automatically if key is invalid

3. **Frontend build errors:**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **CORS issues:**
   - Backend includes CORS headers for all origins
   - Ensure backend is running on correct port
   - Check frontend API URL configuration

## 📊 Performance Optimization

- **Frontend**: Production build with code splitting and optimization
- **Backend**: Efficient API calls with error handling
- **AI Processing**: DeepSeek V3.1 for cost-effective operations
- **Caching**: Browser caching for static assets

## 🔒 Security Considerations

- API keys stored in environment variables
- CORS properly configured
- Input validation on all endpoints
- Error messages don't expose sensitive information

## 📈 Monitoring

The application includes:
- Real-time backend status monitoring
- API health checks
- Demo mode indicators
- Error logging and handling

## 🚀 Next Steps

1. **Deploy to Production**: Use the packaged frontend and configure backend hosting
2. **Configure API Key**: Add your DeepSeek API key for full functionality
3. **Customize Content**: Update project documentation in `backend/data/`
4. **Scale**: Consider load balancing for high-traffic scenarios

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Test in demo mode first
- Verify all dependencies are installed

---

**Built with ❤️ using DeepSeek V3.1 for cost-effective AI processing**

