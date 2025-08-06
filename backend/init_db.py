from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Create Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define the model
class TextContent(db.Model):
    """Model for storing text content"""
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f'<TextContent {self.id}>'

def init_database():
    """Initialize the database with sample data"""
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Clear existing data and recreate
        TextContent.query.delete()
        db.session.commit()
        print("Cleared existing data.")
        
        # Add United Nations About content
        un_about_content = """
        About the United Nations

        The United Nations is an international organization founded in 1945. Currently made up of 193 Member States, the UN and its work are guided by the purposes and principles contained in its founding Charter.

        The UN has evolved over the years to keep pace with a rapidly changing world. But one thing has stayed the same: it remains the one place on Earth where all the world's nations can gather together, discuss common problems, and find shared solutions that benefit all of humanity.

        One place where the world's nations can gather together, discuss common problems and find shared solutions.

        The UN's Membership has grown from the original 51 Member States in 1945 to the current 193 Member States. All UN Member States are members of the General Assembly. States are admitted to membership by a decision of the General Assembly upon the recommendation of the Security Council.

        The main bodies of the UN are the General Assembly, the Security Council, the Economic and Social Council, the Trusteeship Council, the International Court of Justice, and the UN Secretariat. All were established in 1945 when the UN was founded.

        The Secretariat carries out the day-to-day work of the UN as mandated by the General Assembly and the Organization's other main bodies. The Secretary-General is the head of the Secretariat, which has tens of thousands of international UN staff members working at duty stations all over the world.

        The United Nations is part of the UN system, which, in addition to the UN itself, comprises many programmes, funds and specialized agencies, each of which have their own area of work, leadership and budget. The UN coordinates its work with these separate UN system entities, all of which cooperate with the Organization to help it achieve its goals.

        Source: United Nations Official Website (https://www.un.org/en/about-us)
        """
        
        # Create new text content entry
        new_content = TextContent(content=un_about_content.strip())
        db.session.add(new_content)
        db.session.commit()
        
        print("Database initialized successfully with UN About content.")

if __name__ == '__main__':
    init_database() 