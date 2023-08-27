$(document).ready(function() {
    fetchTasks();

    $('#create-form').submit(function(event) {
        event.preventDefault();
        console.log("Form submitted");
        createTask();
    });

    $('#task-list').on('click', '.complete-checkbox', function() {
        const taskId = $(this).data('taskid');
        console.log("Checkbox clicked. Task ID:", taskId);
        markTaskAsComplete(taskId);
    });
});

function fetchTasks() {
    $.get('/tasks', function(data) {
        console.log("Fetched tasks:", data);
        const taskList = $('#task-list');
        taskList.empty();

        data.forEach(function(task) {
            const completedStatus = task.completed ? 'Completed' : 'Not Completed';
            const listItem = `<li class="${task.completed ? 'completed' : ''}">
                <strong>${task.title}</strong><br>
                Description: ${task.description}<br>
                Status: ${completedStatus}
                <input type="checkbox" class="complete-checkbox" data-taskid="${task.task_id}">
            </li>`;
            taskList.append(listItem);
        });
    });
}

function createTask() {
    const title = $('#title').val();
    const description = $('#description').val();
    const completed = $('#completed').is(':checked');

    const taskData = {
        title: title,
        description: description,
        completed: completed
    };

    console.log("Sending POST request with data:", JSON.stringify(taskData));
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: JSON.stringify(taskData),
        contentType: 'application/json',
        headers: {
        'Content-Type': 'application/json'
         },
        // ... rest of the code
        success: function(response) {
            console.log(response.message);
            fetchTasks();
            $('#message').text('Task created successfully').removeClass('error').addClass('success');
        },
        error: function(error) {
            console.error('Error creating task:', error);
            $('#message').text('Error creating task').removeClass('success').addClass('error');
        }
    });
    }

function markTaskAsComplete(taskId) {
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
        success: function(response) {
            console.log(response.message);
            fetchTasks();
            $('#message').text('Task marked as complete').removeClass('error').addClass('success');
        },
        error: function(error) {
            console.error('Error marking task as complete:', error);
            $('#message').text('Error marking task as complete').removeClass('success').addClass('error');
        }
    });
}
