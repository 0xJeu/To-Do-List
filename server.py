from flask import Flask, request, Response, jsonify, render_template
from flask_bootstrap import Bootstrap
import json

app = Flask(__name__)
bootstrap = Bootstrap(app)

tasks = []
task_id_counter = 0


class Task:
    def __init__(self, task_id, title, description, completed=False):
        self.task_id = task_id
        self.title = title
        self.description = description
        self.completed = completed


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/tasks', methods=['GET', 'POST'])
def manage_tasks():
    global task_id_counter

    if request.method == 'GET':
        formatted_tasks = []
        for task in tasks:
            formatted_task = {
                "task_id": task.task_id,
                "title": task.title,
                "description": task.description,
                "completed": task.completed
            }
            formatted_tasks.append(formatted_task)
        json_str = json.dumps(formatted_tasks, sort_keys=False)
        return Response(json_str, content_type='application/json; charset=utf-8')

    elif request.method == 'POST':
        data = request.json

        if 'title' in data and 'description' in data:
            new_task = Task(task_id_counter, data['title'], data['description'], data.get('completed', False))
            tasks.append(new_task)
            task_id_counter += 1
            return jsonify({"message": "Task created successfully"}), 201
        else:
            return jsonify({"message": "Invalid task data"}), 400


@app.route('/tasks/<int:task_id>', methods=['PUT'])
def mark_task_as_complete(task_id):
    for task in tasks:
        if task.task_id == task_id:
            task.completed = True
            return jsonify({"message": "Task marked as complete"})
    return jsonify({"message": "Task not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
