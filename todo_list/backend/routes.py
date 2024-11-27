from app import app, db
from flask import request, jsonify
from models import Todo

# get all tasks
@app.route('/', methods=["GET"])
def get_all_tasks():
    Tasks = Todo.query.all()
    result = [task.to_json() for task in Tasks]
    return jsonify(result)

# create a task
@app.route('/', methods=["POST"])
def create_task():
    data = request.json
    
    title = data.get("title")
    description = data.get("description")
    
    new_task = Todo(title=title, description=description)
     
    try:
        db.session.add(new_task)
        db.session.commit()
        
        return jsonify({"success": new_task.to_json()}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# update a task
@app.route('/<int:id>', methods=["PATCH"])
def update_task(id):
    task = Todo.query.get(id)
    if task is None:
        return jsonify({"error": f"not found task with id: {id}"}), 404
    
    data = request.json
    
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    
    try: 
        db.session.commit()
    
        return jsonify({
            "title": task.title,
            "description": task.description
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# delete task
@app.route('/<int:id>', methods=["DELETE"])
def delete_task(id):
    task = Todo.query.get(id)
    if not task:
        return jsonify({"error": f"not found task with id: {id}"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"success": f"{task.id} deleted"}), 200
