#!/usr/bin/env python3
"""
AI Insight Generator Backend - Main Entry Point
Powered by DeepSeek V3.1 for cost-effective AI processing
"""

import os
from app import app

if __name__ == "__main__":
    # For production deployment
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)

