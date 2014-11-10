//problem: no user interaction.
//solution: add interactivity.

var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0];
var incompleteTasksHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

//new task list item
var createNewTaskElement = function (taskString) {
	//create list item
	var listItem = document.createElement('li');
	var checkBox = document.createElement('input'); // checkbox
	var label = document.createElement('label');
	var editInput = document.createElement('input'); //text 
	var editButton = document.createElement('button');
	var deleteButton = document.createElement('button');

	//each element needs modifying
	checkBox.type = 'checkbox';
	editInput.type = 'text';

	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'delete';

	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	

	return listItem;
}


//PREVENT ADDITION OF EMPTY TASKS
//add new task
var addTask = function () {
	console.log('Add task...');
	var listItem = createNewTaskElement(taskInput.value);
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";
}	

//edit task

//CHANGE BUTTON TO SAY 'SAVE' WHEN IN EDIT MODE!!!
var editTask = function () {
	console.log('Add edit...');
	
	var listItem = this.parentNode;

	var editInput = listItem.querySelector('input[type=text]');
	var label = listItem.querySelector('label');	

	var containsClass = listItem.classList.contains('editMode');
		//if .editmode
		if(containsClass) {
			//turn off editmode
			//label text become input value
			label.innerText = editInput.value;

			
		} else {	
			//switch to edit mode
			//input value becomes labels text
			editInput.value = label.innerText;
			

		}	
	//toggle .editmode	on li	
	listItem.classList.toggle('editMode');
}

//delete task
var deleteTask = function () {
	console.log('Delete task...');
	//remover parent from ul
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}

//mark a task complete
var taskCompleted = function(){
	console.log('Task complete...');
	//when checked
		//append task li to #completed-tasks
	var listItem = this.parentNode;	
	completedTasksHolder.appendChild(listItem);	
	bindTaskEvents(listItem, taskIncomplete);
}

//mark task incomplete
var taskIncomplete = function () {
	console.log('Task incomplete...');
	//when uncheched 
		//append to #incomplete tasks
	var listItem = this.parentNode;	
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);		
}




var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	console.log('bind list item events')
	//select taskListItem's children
	var checkBox = taskListItem.querySelector('input[type=checkbox]');
	var editButton = taskListItem.querySelector('button.edit');
	var deleteButton = taskListItem.querySelector('button.delete');
		//bind editTask to edit button
		editButton.onclick = editTask;
		//bind deleteTask to delete button
		deleteButton.onclick = deleteTask;
		//bind checkBoxEventHandler to checkbox
		checkBox.onchange = checkBoxEventHandler;
	}

var ajaxRequest = function () {
	console.log('ajax request!');
}

//set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

//cycle over incompleteTasksHolder ul li'
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
		bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
	}
	//for each list item
		//bind events to li's children (taskCompleted)

//cycle over completedTasksHolder ul li'
for(var i = 0; i < completedTasksHolder.children.length; i++) {
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
	}
		//bind events to li's children (taskIncomplete)
	