//We start off with 'DOMContentLoaded' event, which ensures that the Javascript code doesn't run until the HTML document is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    //We're getting references to the HTML elements using their ID's.  We use 'document.getElementById' to get references to key HTML elements we need, such as the form, input field, and the list where todos will be displayed.
    const form = document.getElementById("todo-form");  //The form element
    const input = document.getElementById("todo-input"); //the input field for new to-do's
    const todoList = document.getElementById("todo-list");  //The list where to-do's will be displayed

    //This event listener listens for form submission.  We add an event listener for the form's submit event.  When the form is submitted (by clicking the "add button or pressing enter in the input field"), the event listener is triggered.
    form.addEventListener("submit", function (e) {
        //We prevent the default form submission behavior.  This is inside the event listener form submission in order to prevent the defualt form submission behavior.  This prevents the page from reloading when the form is submitted.
        e.preventDefault();

        //Get the trimmed value (text) from the input fried. We retrieve the text from the input field and trim it to remove any leading or trailing whitespace.
        const todoText = input.value.trim();

        //Check if the input is empty or contains only white space.  We check if the input is empty.  If it's empty, we do nothing (to prevent adding empty to-dos)
        if (todoText === "") {
            return; // If it's empty, do nothing (don't add empty todos)
        }

        //Create new HTML elements for the to-do item.  We create new HTML elements for the to-do item: a list item ('li'). a span element for the to-do text ('todoTextElement'), and a button for deleting the to-do ('deleteButton').
        const li = document.createElement("li");  //Create a list item (li)
        const todoTextElement = document.createElement("span"); //Create a span element for the to-do text.
        const deleteButton = document.createElement("button"); // Create a button for deleting the to-do.

        //Set the text content for the to-do and delete button.
        todoTextElement.textContent = todoText;
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");

        //Add the to-do text and delete button to the list item (li) through appending.
        li.appendChild(todoTextElement);
        li.appendChild(deleteButton);

        //Add the list item (li) to the to-do list.
        todoList.appendChild(li);

        input.value = ""; // Clear the input field after adding the to-do.

        //Add a click event listener to the delete button.  So, when the delete button is clicked, it removes the associated to-do item ('li') from the list.
        deleteButton.addEventListener("click", function () {
            li.remove(); // Remove the to-do when the delete button is clicked
        });

        todoTextElement.addEventListener("click", function () {
            li.classList.toggle("complete"); // Toggle the "complete" class to cross out the text.  So, we added a click event listener to the to-do text ('todoTextElement').  When the todo text is clicked, it toggles the 'complete' class on the to-do item ('li').  This class is responsible for crossing out the text to mark it as completed.
        });
    });
});