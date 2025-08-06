"""
Flask Backend API for Fullstack Flask React D3 Test

This module provides a RESTful API with three main endpoints:
1. GET /api/getMenu - Returns navigation menu items
2. GET /api/rules/us_population_data - Returns US population data
3. GET /api/rules/about - Returns database content with timestamp

Dependencies:
- Flask 2.3.3
- Flask-SQLAlchemy 3.0.5
- Flask-CORS 4.0.0
- requests 2.31.0

Database:
- SQLite with SQLAlchemy ORM
- TextContent model for storing text data
"""

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from datetime import datetime

# Initialize Flask application
app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
CORS(app)  # Enable CORS for frontend integration

# Database Models
class TextContent(db.Model):
    """Model for storing text content"""
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f'<TextContent {self.id}>'

@app.route('/api/getMenu', methods=['GET'])
def get_menu():
    """Returns static JSON with 3 menu items"""
    menu_items = [
        {"id": 1, "name": "table", "label": "Table"},
        {"id": 2, "name": "chart", "label": "Chart"},
        {"id": 3, "name": "about", "label": "About"}
    ]
    return jsonify(menu_items)

@app.route('/api/rules/us_population_data', methods=['GET'])
def get_us_population_data():
    """Fetch US population data from external source and transform it"""
    try:
        # Fetch data from the external URL
        url = "https://raw.githubusercontent.com/molipet/full-stack-test/refs/heads/main/data.json"
        response = requests.get(url)
        response.raise_for_status()
        
        # Parse the JSON data
        response_data = response.json()
        
        # Extract the data array from the response
        data = response_data.get('data', [])
        
        # Transform the data into the required format
        transformed_data = []
        for item in data:
            if 'Year' in item and 'Population' in item:
                transformed_data.append({
                    "year": int(item['Year']),
                    "population": int(item['Population'])
                })
        
        return jsonify(transformed_data)
    
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to fetch data: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Error processing data: {str(e)}"}), 500

@app.route('/api/rules/about', methods=['GET'])
def get_about():
    """Returns the text stored in DB with timestamp"""
    try:
        # Get the first text content from the database
        text_content = TextContent.query.first()
        
        if text_content:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            return jsonify({
                "content": text_content.content,
                "last_update": timestamp
            })
        else:
            return jsonify({"error": "No content found in database"}), 404
            
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5001) 