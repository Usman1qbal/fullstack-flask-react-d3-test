# Fullstack Flask React D3 Test

A full-stack web application built with Flask backend, React frontend, and D3.js for data visualization.

## 🏗️ Project Structure

```
fullstack-flask-react-d3-test/
├── backend/                 # Flask API backend
│   ├── app.py              # Main Flask application with API endpoints
│   ├── models.py           # SQLAlchemy database models
│   ├── init_db.py          # Database initialization script
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend container configuration
│   ├── test_api.py         # API testing script
│   └── venv/               # Python virtual environment
├── frontend/               # React frontend (to be implemented)
├── docker-compose.yml      # Multi-container orchestration
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+ (for frontend)
- Docker & Docker Compose (optional)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize database:**
   ```bash
   python init_db.py
   ```

5. **Start Flask server:**
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5001`

### Frontend Setup (Coming Soon)
```bash
cd frontend
npm install
npm start
```

### Docker Setup (Alternative)
```bash
docker-compose up --build
```

## 📡 API Endpoints

### 1. GET `/api/getMenu`
Returns static JSON with navigation menu items.

**Response:**
```json
[
  {"id": 1, "name": "table", "label": "Table"},
  {"id": 2, "name": "chart", "label": "Chart"},
  {"id": 3, "name": "about", "label": "About"}
]
```

### 2. GET `/api/rules/us_population_data`
Fetches US population data from external source and transforms it.

**Response:**
```json
[
  {"year": 2022, "population": 331097593},
  {"year": 2021, "population": 331893745},
  ...
]
```

### 3. GET `/api/rules/about`
Returns text content from database with timestamp.

**Response:**
```json
{
  "content": "Lorem ipsum dolor sit amet...",
  "last_update": "2024-01-15 14:30:25"
}
```

## 🧪 Testing

### API Testing
Run the included test script to verify all endpoints:
```bash
cd backend
source venv/bin/activate
python test_api.py
```

### Manual Testing
Test endpoints using curl:
```bash
# Test menu endpoint
curl http://localhost:5001/api/getMenu

# Test population data endpoint
curl http://localhost:5001/api/rules/us_population_data

# Test about endpoint
curl http://localhost:5001/api/rules/about
```

## 🛠️ Development

### Backend Development
- **Framework:** Flask 2.3.3
- **Database:** SQLite with SQLAlchemy ORM
- **CORS:** Enabled for frontend communication
- **Port:** 5001 (changed from 5000 due to macOS AirPlay)

### Key Files
- `app.py` - Main Flask application with all API endpoints
- `models.py` - Database models (TextContent)
- `init_db.py` - Database initialization with sample data
- `test_api.py` - Comprehensive API testing script

### Database Schema
```sql
CREATE TABLE text_content (
    id INTEGER PRIMARY KEY,
    content TEXT NOT NULL
);
```

## 🐳 Docker Configuration

The project includes Docker support for easy deployment:

- **Backend:** Python 3.9 with Flask
- **Frontend:** Node.js with React (to be implemented)
- **Database:** PostgreSQL (configured in docker-compose.yml)

## 📝 Notes

- Port 5000 is used by macOS AirPlay, so the backend runs on port 5001
- Database is automatically initialized with Lorem ipsum content
- CORS is enabled for frontend integration
- Debug mode is enabled for development

## 🔄 Next Steps

1. ✅ Backend API implementation
2. 🔄 React frontend with D3.js integration
3. 🔄 Docker containerization
4. 🔄 End-to-end testing
5. 🔄 Production deployment

## 📄 License

This project is for testing and demonstration purposes.