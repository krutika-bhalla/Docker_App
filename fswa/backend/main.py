from config import app, db
from flask import request, jsonify
from models import Contact

# create contact
@app.route("/", methods=["POST"])
def create_contact():
    data = request.json
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    email = data.get("email")
    
    if not first_name or not last_name or not email:
        return (
            jsonify({"error": "You must include first name, last name, email"}), 
            400
        )
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
    return jsonify({"message": "User Created!"}), 201
    
# update contact
@app.route("/<int:id>", methods=["PATCH"])
def update_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"error":"No such contact exists"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    
    db.session.commit()
    
    return jsonify({"message": "User Updated"}), 200

# get all contacts
@app.route("/", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    result = [contact.to_json() for contact in contacts]
    return jsonify(result)

# delete contacts
@app.route("/<int:id>", methods=["DELETE"])
def delete_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"error":"No such contact exists"}), 404
    db.session.delete(contact)
    db.session.commit()
    
    return jsonify({"message":"Deleted successfully"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8080)
