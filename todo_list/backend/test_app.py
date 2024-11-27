import pytest
from app import app, db
from models import Todo

@pytest.fixture
def client():
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"  # In-memory database for testing
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()


def test_get_all_tasks_empty(client):
    """Test GET / when no tasks exist"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json == []


def test_create_task(client):
    """Test POST / to create a new task"""
    data = {"title": "Test Task", "description": "This is a test task"}
    response = client.post("/", json=data)
    assert response.status_code == 201
    assert response.json["success"]["title"] == "Test Task"
    assert response.json["success"]["description"] == "This is a test task"


def test_get_all_tasks(client):
    """Test GET / after adding tasks"""
    # Add a task
    data = {"title": "Task 1", "description": "Description 1"}
    client.post("/", json=data)

    # Fetch tasks
    response = client.get("/")
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]["title"] == "Task 1"
    assert response.json[0]["description"] == "Description 1"


def test_update_task(client):
    """Test PATCH /<id> to update a task"""
    # Add a task
    data = {"title": "Task to Update", "description": "Original Description"}
    post_response = client.post("/", json=data)
    task_id = post_response.json["success"]["id"]

    # Update the task
    updated_data = {"title": "Updated Task", "description": "Updated Description"}
    patch_response = client.patch(f"/{task_id}", json=updated_data)

    assert patch_response.status_code == 200
    assert patch_response.json["title"] == "Updated Task"
    assert patch_response.json["description"] == "Updated Description"


def test_update_task_not_found(client):
    """Test PATCH /<id> for a non-existent task"""
    response = client.patch("/999", json={"title": "Non-existent"})
    assert response.status_code == 404
    assert "not found task with id: 999" in response.json["error"]


def test_delete_task(client):
    """Test DELETE /<id> to delete a task"""
    # Add a task
    data = {"title": "Task to Delete", "description": "To be deleted"}
    post_response = client.post("/", json=data)
    task_id = post_response.json["success"]["id"]

    # Delete the task
    delete_response = client.delete(f"/{task_id}")
    assert delete_response.status_code == 200
    assert f"{task_id} deleted" in delete_response.json["success"]

    # Verify deletion
    get_response = client.get("/")
    assert len(get_response.json) == 0


def test_delete_task_not_found(client):
    """Test DELETE /<id> for a non-existent task"""
    response = client.delete("/999")
    assert response.status_code == 404
    assert "not found task with id: 999" in response.json["error"]
