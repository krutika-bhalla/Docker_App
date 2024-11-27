from app import app, db
from flask import request, jsonify
from models import Friend

# get all friends
@app.route("/api/friends", methods=['GET'])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

# create a friend
@app.route("/api/friends", methods=['POST'])
def create_friend():
    try:
        data = request.json
        
        required_fields = ["name", "role", "gender", "description"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"{field} is missing"}), 400
             
        name = data.get("name")
        role = data.get("role")
        gender = data.get("gender")
        description = data.get("description")
        
        if gender == "male":
            names = name.split(' ')
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
            # img_url = "Hello"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
            # img_url = "Hi"
        else:
            img_url = None
        
        new_friend = Friend(name = name, role = role, gender = gender, description = description, img_url = img_url)
        print(new_friend)
        db.session.add(new_friend)
        
        db.session.commit()
        
        return jsonify(new_friend.to_json()), 201
    
    except Exception as e:
        db.session.rollback()
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/friends/<int:id>', methods=['PATCH'])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": f"not found friend with id: {id}"}), 404
            
        data = request.json
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)
        
        db.session.commit()
        
        # Return updated friend data as a dictionary
        return jsonify({
            "id": friend.id,
            "name": friend.name,
            "role": friend.role,
            "description": friend.description,
            "gender": friend.gender
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/friends/<int:id>', methods=['DELETE'])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error":f"not found friend with id: {id}"}), 404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg": f"{friend.name} deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# @app.after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'
#     response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
#     response.headers['Access-Control-Allow-Credentials'] = 'true'
#     return response

# # Handle OPTIONS requests
# @app.route('/api/friends', methods=['OPTIONS'])
# @app.route('/api/friends/<int:id>', methods=['OPTIONS'])
# def handle_options():
#     return '', 200

            
        
        