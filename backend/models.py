from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TextContent(db.Model):
    """Model for storing text content"""
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f'<TextContent {self.id}>' 