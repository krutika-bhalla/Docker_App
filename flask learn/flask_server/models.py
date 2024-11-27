from app import db

class Friend(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "gender": self.gender,
            "description": self.description,
            "imgUrl": self.img_url
        }
        
    