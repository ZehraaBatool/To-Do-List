var categories = [];
var completedTasks = [];

function showNewCategoryInput() {
    var inputContainer = document.getElementById("newCategoryInputContainer");
    inputContainer.style.display = "block";
}

function getCurrentDateTime() {
    var now = new Date();
    return now.toLocaleString();
}

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("taskInput").value;
    var categoryInput = document.getElementById("categoryInput").value.trim();

    if (inputValue === '') {
        alert("You did not write any item!");
        return;
    }

    if (categoryInput !== '' && categories.indexOf(categoryInput) === -1) {
        categories.push(categoryInput);
        updateCategoryDropdown();
    }

    var selectedCategory = document.getElementById("categoryDropdown").value;
    var finalCategory = selectedCategory !== 'all' ? selectedCategory : categoryInput;

    var t = document.createTextNode(inputValue);
    li.setAttribute('data-category', finalCategory);
    li.appendChild(t);

    document.getElementById("myUL").appendChild(li);
    rotateButton(li);

    document.getElementById("taskInput").value = "";
    document.getElementById("categoryInput").value = "";

    li.onclick = function() {
        this.classList.toggle('checked');
        moveToCompleted(this);
    };
}
function rotateButton(element) {
    var mybutton = document.getElementById("addButton");
    mybutton.style.transform = 'rotate(180deg)';

    setTimeout(function() {
        mybutton.style.transform = 'rotate(0deg)';
        var inputContainer = document.getElementById("newCategoryInputContainer");
        inputContainer.style.display = "none";
    }, 300);
}

function updateCategoryDropdown() {
    var categoryDropdown = document.getElementById("categoryDropdown");
    categoryDropdown.innerHTML = '';

    var allCategoriesOption = document.createElement("option");
    allCategoriesOption.value = 'all';
    allCategoriesOption.text = 'All Categories';
    categoryDropdown.add(allCategoriesOption);

    categories.forEach(function(category) {
        var option = document.createElement("option");
        option.value = category;
        option.text = category;
        categoryDropdown.add(option);
    });
}

function filterTasks() {
    var selectedCategory = document.getElementById("categoryDropdown").value;
    var tasks = document.getElementsByTagName("LI");

    for (var i = 0; i < tasks.length; i++) {
        var taskCategory = tasks[i].getAttribute('data-category');

        if (selectedCategory === 'all' || selectedCategory === taskCategory) {
            tasks[i].style.display = 'block';
        } else {
            tasks[i].style.display = 'none';
        }
    }
}

function moveToCompleted(taskElement) {
    if (taskElement.classList.contains('checked')) {
        var completionDateTime = getCurrentDateTime();
        completedTasks.push({ task: taskElement.cloneNode(true), completionDateTime: completionDateTime });
        updateCompletedTasksList();
        taskElement.style.textDecoration = "line-through"; // Apply strikethrough in the simple task list
    }
}

function updateCompletedTasksList() {
    var completedTasksList = document.getElementById("completedTasks");
    completedTasksList.innerHTML = '';

    completedTasks.forEach(function(completedTask) {
        var li = document.createElement("li");
        li.appendChild(completedTask.task);

        var dateTimeSpan = document.createElement("SPAN");
        var dateTimeText = document.createTextNode("Completed on: " + completedTask.completionDateTime);
        dateTimeSpan.appendChild(dateTimeText);
        li.appendChild(dateTimeSpan);

        completedTasksList.appendChild(li);
    });
}
