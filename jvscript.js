// Wait until all HTML elements are loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select elements from the HTML
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-container');

    // Function to show/hide the empty image depending on the task list
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    // Function to add a new task
    const addTask = (text, completed = false) => {
        const taskText = text || taskInput.value.trim(); // get and clean input value

        // Stop function if input is empty
        if (!taskText) {
            return;
        }

        // Create a new list item (task)
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
// Select the checkbox and edit button inside the newly created task
const checkbox = li.querySelector('.checkbox');
const editBtn = li.querySelector('.edit-btn');

// If the task is already marked as completed (for future localStorage use)
if (completed) {
    // Add the "completed" class to visually show it's done (strikethrough effect)
    li.classList.add('completed');

    // Disable the edit button to prevent changes to finished tasks
    editBtn.disabled = true;

    // Make the edit icon slightly transparent
    editBtn.style.opacity = '0.5';

    // Prevent the button from being clickable
    editBtn.style.pointerEvents = 'none';
}

    // When the checkbox is clicked (checked or unchecked)
    checkbox.addEventListener('change', () => {
    const isChecked = checkbox.checked; // Get the current state (true/false)

    // Toggle the "completed" class on the task (adds/removes strikethrough)
    li.classList.toggle('completed', isChecked);

    // Disable the edit button if task is checked
    editBtn.disabled = isChecked;

    // Change edit button appearance based on checkbox state
    editBtn.style.opacity = isChecked ? '0.5' : '1';
    editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
});

    // When the edit button is clicked
    editBtn.addEventListener('click', () => {
    // Only allow editing if the task is not checked
    if (!checkbox.checked) {
        // Put the current task text back into the input field for editing
        taskInput.value = li.querySelector('span').textContent;

        // Remove the old task from the list (will be replaced by edited one)
        li.remove();

        // Update empty image if no tasks remain
        toggleEmptyState();
    }
});

    // When the delete button is clicked
    li.querySelector('.delete-btn').addEventListener('click', () => {
    // Remove the task completely from the list
    li.remove();

    // Check if the list is empty and show/hide the empty image
    toggleEmptyState();
});


        // Add new task to the task list
        taskList.appendChild(li);

        // Clear input field after adding
        taskInput.value = '';

        // Update empty image visibility
        toggleEmptyState();
    };

    // Add button click event
    addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault(); // stop the form from reloading the page
    addTask();
});

    // Allow pressing "Enter" key to work like clicking the Add (+) button
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();
            addTask();
        }
    });
});
