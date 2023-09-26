document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Retrieve to-dos from localStorage when the page loads.  We retrieve the to-dos using JSON.parse(localStorage.getItem('todos')) and store them in the savedTodos array.  If there are no saved to-dos, we intialize savedTodos as an empty array.
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Function to save to-dos to localStorage.
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(savedTodos));
    }

    // Function to create a new to-do item and add it to the list.  Inside the createTodoItem function, after creating a new todo item and adding it to the list, we also add or remove the to-do text from the savedTodos array depending on whether a new todo is added or an existing one is deleted. We then call savedTodos to update localStorage.
    function createTodoItem(todoText) {
        const li = document.createElement("li");
        const todoTextElement = document.createElement("span");
        const deleteButton = document.createElement("button");

        todoTextElement.textContent = todoText;
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");

        li.appendChild(todoTextElement);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        // Add a click event listener to the delete button.
        deleteButton.addEventListener("click", function () {
            // Remove the to-do item from the list and savedTodos.
            const index = savedTodos.indexOf(todoText);
            if (index !== -1) {
                savedTodos.splice(index, 1);
                saveTodos();
            }
            li.remove();
        });

        // Add a click event listener to the to-do text.
        todoTextElement.addEventListener("click", function () {
            li.classList.toggle("complete");
        });
    }

    // Populate the to-do list with saved to-dos when the page loads.  So, when it loads, we populate the to-do list with the items from localStorage by iterating over the savedTodos array and calling the createTodoItem function for each item.
    savedTodos.forEach(function (todoText) {
        createTodoItem(todoText);
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const todoText = input.value.trim();

        if (todoText === "") {
            return;
        }

        // Add the new to-do to the list and savedTodos.  So, when a new to-do is added, we put it to the savedTodos array and immediately call saveTodos to update localStorage.
        savedTodos.push(todoText);
        saveTodos();

        createTodoItem(todoText);

        input.value = "";
    });
});