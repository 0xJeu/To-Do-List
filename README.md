# Task Management Web App

<img width="1440" alt="Screenshot 2023-08-27 at 11 35 19 AM" src="https://github.com/0xJeu/To-Do-List/assets/129988927/eefeb4d4-9b6d-433b-be9b-dac86573d4ea">

This repository contains a simple web application built using Flask, a micro web framework for Python. The application serves as a task management system where users can create, view, and mark tasks as complete.

## Getting Started

To run the application, follow these steps:

1. Install the required dependencies by running the following command in your terminal:
   ```
   pip install Flask Flask-Bootstrap
   ```

2. Clone this repository to your local machine:
   ```
   git clone [<repository_url>](https://github.com/0xJeu/To-Do-List.git)
   ```

3. Navigate to the repository directory:
   ```
   cd [<repository_directory>](https://github.com/0xJeu/To-Do-List.git)
   ```

4. Run the application by executing the following command:
   ```
   python app.py
   ```

5. Open your web browser and go to `http://localhost:5000` to access the application.

## Features

- **Task Creation:** Users can create new tasks by providing a title and description. Optionally, a task can be marked as completed during creation.

- **Task Listing:** All existing tasks are displayed on the main page in a list format. Each task shows its title, description, and completion status.

- **Mark as Complete:** Users can mark a task as complete by sending a PUT request to the `/tasks/<task_id>` endpoint.

## API Endpoints

- `GET /tasks`: Retrieve the list of tasks in JSON format.

- `POST /tasks`: Create a new task. Requires a JSON payload with `title` and `description` fields. Optionally, you can include a `completed` field to specify the completion status.

- `PUT /tasks/<task_id>`: Mark a task as complete. Requires the `task_id` as part of the URL.

## Code Overview

The code consists of the following components:

- `app.py`: The main application file. It sets up the Flask app, defines the routes, and contains the logic for managing tasks.

- `templates/index.html`: The HTML template used to render the main page. It displays the list of tasks and provides a simple user interface.

- `Task` Class: A class representing a task object. It includes attributes like `task_id`, `title`, `description`, and `completed`.

## Contributing

Contributions to this project are welcome! If you find any issues or want to add new features, feel free to create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Note:** This README provides a general overview of the application and its functionality. For detailed instructions on using specific API endpoints and interacting with the application, refer to the API documentation or inline comments in the source code.
