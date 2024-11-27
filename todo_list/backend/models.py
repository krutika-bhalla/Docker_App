from app import db

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    
    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description
        }