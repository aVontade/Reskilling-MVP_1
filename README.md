[README.md](https://github.com/user-attachments/files/22009089/README.md)
# AI Insight Generator - Powered by DeepSeek V3.1

An interactive AI-powered platform that transforms static content about "Reskilling for the AI Economy" into a dynamic, conversational experience with real-time visualizations.

## 🚀 Features

- **AI-Powered Q&A**: Ask questions about AI reskilling and get intelligent responses
- **Dynamic Visualizations**: Generate interactive charts and graphs on-demand
- **Cost-Effective AI**: Powered by DeepSeek V3.1 (685B parameters) for optimal cost-performance ratio
- **Interactive Interface**: Modern React frontend with real-time API integration

## 🤖 Why DeepSeek V3.1?

- **685 billion parameters** - Massive model capacity
- **Cost-effective** - Significantly cheaper than GPT-4/ChatGPT
- **Open-source foundation** - Transparent and accessible
- **Strong performance** - Excellent reasoning and generation capabilities
- **API compatibility** - Works with OpenAI-compatible endpoints

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure DeepSeek API:
   - Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)
   - Update the `.env` file:
     ```
     DEEPSEEK_API_KEY=your-actual-deepseek-api-key-here
     ```

4. Run the backend server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 📡 API Endpoints

- `GET /` - API information and status
- `GET /api/health` - Health check with DeepSeek integration status
- `POST /api/qa` - Ask questions (powered by DeepSeek V3.1)
- `POST /api/visualization` - Generate visualizations (powered by DeepSeek V3.1)

## 🎯 Demo Mode

The application includes a demo mode that works without API keys, showing:
- Sample Q&A responses explaining the system
- Demo visualizations comparing AI models
- Full functionality preview

## 💡 Cost Comparison

| Model | Cost per 1M tokens | Performance | Our Choice |
|-------|-------------------|-------------|------------|
| DeepSeek V3.1 | ~$0.14 | ⭐⭐⭐⭐⭐ | ✅ **Selected** |
| GPT-4 | ~$30.00 | ⭐⭐⭐⭐⭐ | ❌ Too expensive |
| Claude 3 | ~$15.00 | ⭐⭐⭐⭐ | ❌ More expensive |

## 🏗️ Architecture

```
Frontend (React) ↔ Backend (Flask) ↔ DeepSeek V3.1 API
     ↓                    ↓
 Vega-Lite Charts    Knowledge Base
                     (Local Files)
```

## 📊 Technology Stack

- **Backend**: Python, Flask, Flask-CORS
- **Frontend**: React, Vega-Embed, Axios
- **AI Model**: DeepSeek V3.1 (685B parameters)
- **Visualization**: Vega-Lite
- **Data**: Local markdown files (project plan, reskilling guide)

## 🔧 Configuration

### Environment Variables

```bash
# Backend (.env)
DEEPSEEK_API_KEY=your-deepseek-api-key

# Optional: Custom base URL
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

## 🚀 Deployment

The application is designed to be easily deployable with:
- Backend: Flask server on port 5000
- Frontend: React development server on port 3000
- CORS enabled for cross-origin requests

## 📈 Performance Benefits

Using DeepSeek V3.1 provides:
- **95% cost reduction** compared to GPT-4
- **Excellent reasoning** capabilities
- **Fast response times**
- **Scalable** for high-volume usage
- **Open-source** transparency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with DeepSeek API
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- DeepSeek team for the excellent V3.1 model
- Original project plan and reskilling content
- Open-source community for tools and libraries

