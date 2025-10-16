// Wait until all HTML elements are loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select elements from the HTML
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');

    // Function to show/hide the empty image depending on the task list
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    };

    // Function to add a new task
    const addTask = (event) => {
        event.preventDefault(); // prevent form from reloading the page
        const taskText = taskInput.value.trim(); // get and clean input value

        // Stop function if input is empty
        if (!taskText) {
            return;
        }

        // Create a new list item (task)
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <!-- Typo fix needed: class"delete-btn" should be class="delete-btn" -->
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>`;

        // Add new task to the task list
        taskList.appendChild(li);

        // Clear input field after adding
        taskInput.value = '';

        // Update empty image visibility
        toggleEmptyState();
    };

    // Add button click event
    addTaskBtn.addEventListener('click', addTask);

    // Allow pressing "Enter" key to work like clicking the Add (+) button
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });
});