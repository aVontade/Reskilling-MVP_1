from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize DeepSeek client (using OpenAI-compatible API)
DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY', 'sk-your-deepseek-api-key')
DEMO_MODE = DEEPSEEK_API_KEY == 'sk-your-deepseek-api-key'

if not DEMO_MODE:
    client = openai.OpenAI(
        api_key=DEEPSEEK_API_KEY,
        base_url="https://api.deepseek.com"
    )
else:
    # Demo mode - will use mock responses
    client = None

# Load data files
def load_data():
    """Load the knowledge base from local files"""
    data = {}
    
    # Load project plan
    try:
        with open('data/project_plan.md', 'r', encoding='utf-8') as f:
            data['project_plan'] = f.read()
    except FileNotFoundError:
        data['project_plan'] = ""
    
    # Load GitHub README
    try:
        with open('data/github_readme.md', 'r', encoding='utf-8') as f:
            data['github_readme'] = f.read()
    except FileNotFoundError:
        data['github_readme'] = ""
    
    return data

# Global data store
knowledge_base = load_data()

@app.route('/api/qa', methods=['POST'])
def qa_endpoint():
    """Handle Q&A requests"""
    try:
        data = request.get_json()
        question = data.get('question', '')
        
        if not question:
            return jsonify({'error': 'Question is required'}), 400
        
        # Create context from knowledge base
        context = f"""
        Based on the following documents about AI reskilling and the AI Insight Generator project, please answer the user's question:
        
        PROJECT PLAN:
        {knowledge_base['project_plan'][:3000]}...
        
        RESKILLING GUIDE:
        {knowledge_base['github_readme'][:3000]}...
        
        Question: {question}
        
        Please provide a comprehensive answer based on the provided context. If the answer isn't directly available in the context, provide relevant insights based on the AI reskilling theme.
        """
        
        if DEMO_MODE:
            # Demo response when API key is not configured
            answer = f"""Based on the AI Insight Generator project and reskilling documentation, here's what I can tell you about "{question}":

This is a demo response showing how the system would work with DeepSeek V3.1 API integration. The AI Insight Generator project aims to transform static content about "Reskilling for the AI Economy" into an interactive digital platform.

Key features include:
- AI-powered Q&A system (like this one)
- Dynamic visualization generation
- Real-time data integration
- Conversational exploration of content

To get actual AI responses, please configure your DeepSeek API key in the .env file.

DeepSeek V3.1 offers:
- 685 billion parameters
- Cost-effective compared to other models
- Strong performance on reasoning tasks
- Open-source foundation"""
        else:
            response = client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "system", "content": "You are an AI assistant helping users understand AI reskilling and the AI Insight Generator project. Provide helpful, accurate responses based on the provided context."},
                    {"role": "user", "content": context}
                ],
                max_tokens=500,
                temperature=0.7
            )
            answer = response.choices[0].message.content
        
        return jsonify({
            'question': question,
            'answer': answer,
            'sources': ['Project Plan', 'Reskilling Guide']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/visualization', methods=['POST'])
def visualization_endpoint():
    """Generate Vega-Lite visualization specifications"""
    try:
        data = request.get_json()
        description = data.get('description', '')
        
        if not description:
            return jsonify({'error': 'Description is required'}), 400
        
        # Create prompt for visualization generation
        prompt = f"""
        Generate a Vega-Lite JSON specification for a visualization based on this description: "{description}"
        
        The visualization should be related to AI adoption, workforce transformation, or reskilling themes.
        
        Create realistic sample data that fits the description. The visualization should be:
        - Interactive where appropriate
        - Well-designed with proper colors and labels
        - Include a meaningful title
        - Use appropriate chart types (bar, line, scatter, etc.)
        
        Return only valid Vega-Lite JSON specification, no additional text or explanation.
        
        Example themes you can use:
        - AI adoption rates by industry
        - Skills transformation timeline
        - Job market changes
        - Training effectiveness metrics
        - Salary premiums for AI skills
        """
        
        if DEMO_MODE:
            # Demo visualization when API key is not configured
            parsed_spec = {
                "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                "title": f"Demo Visualization: {description}",
                "description": "This is a demo chart showing DeepSeek V3.1 integration capabilities",
                "data": {
                    "values": [
                        {"category": "DeepSeek V3.1", "value": 95, "metric": "Cost Effectiveness"},
                        {"category": "GPT-4", "value": 60, "metric": "Cost Effectiveness"},
                        {"category": "Claude 3", "value": 65, "metric": "Cost Effectiveness"},
                        {"category": "DeepSeek V3.1", "value": 90, "metric": "Performance"},
                        {"category": "GPT-4", "value": 95, "metric": "Performance"},
                        {"category": "Claude 3", "value": 88, "metric": "Performance"}
                    ]
                },
                "mark": {"type": "bar", "tooltip": True},
                "encoding": {
                    "x": {"field": "category", "type": "nominal", "title": "AI Model"},
                    "y": {"field": "value", "type": "quantitative", "title": "Score"},
                    "color": {"field": "metric", "type": "nominal", "title": "Metric"},
                    "xOffset": {"field": "metric"}
                },
                "config": {
                    "bar": {"discreteBandSize": 20}
                }
            }
        else:
            response = client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "system", "content": "You are an expert in data visualization and Vega-Lite. Generate only valid Vega-Lite JSON specifications."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            
            vega_spec = response.choices[0].message.content
            
            # Try to parse as JSON to validate
            try:
                parsed_spec = json.loads(vega_spec)
            except json.JSONDecodeError:
                # If parsing fails, return a simple fallback chart
                parsed_spec = {
                    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                    "title": "AI Skills Adoption",
                    "data": {
                        "values": [
                            {"skill": "AI Literacy", "adoption": 45},
                            {"skill": "Data Analysis", "adoption": 60},
                            {"skill": "Machine Learning", "adoption": 30},
                            {"skill": "Prompt Engineering", "adoption": 25}
                        ]
                    },
                    "mark": "bar",
                    "encoding": {
                        "x": {"field": "skill", "type": "nominal", "title": "AI Skills"},
                        "y": {"field": "adoption", "type": "quantitative", "title": "Adoption Rate (%)"}
                    }
                }
        
        return jsonify({
            'description': description,
            'specification': parsed_spec
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'service': 'AI Insight Generator Backend',
        'ai_model': 'DeepSeek V3.1',
        'demo_mode': DEMO_MODE,
        'message': 'Using DeepSeek V3.1 - 685B parameter cost-effective model' if not DEMO_MODE else 'Demo mode - configure DEEPSEEK_API_KEY for full functionality'
    })

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'message': 'AI Insight Generator Backend API - Powered by DeepSeek V3.1',
        'model': 'DeepSeek V3.1 (685B parameters)',
        'demo_mode': DEMO_MODE,
        'endpoints': {
            '/api/qa': 'POST - Ask questions about AI reskilling (powered by DeepSeek)',
            '/api/visualization': 'POST - Generate visualizations (powered by DeepSeek)',
            '/api/health': 'GET - Health check'
        },
        'setup_note': 'Configure DEEPSEEK_API_KEY in .env file for full functionality'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

