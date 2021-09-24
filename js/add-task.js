'use strict'

// Добавляет новую задачу в список

let addTask = function (evt) {
	let mainList = document.querySelector(".taskboard__group--backlog .taskboard__list");
	let listTasks = document.querySelectorAll(".taskboard__list");
	let newTaskField = document.getElementById("add-task");
	let taskForm = document.querySelector(".add-task__form");
	let taskTemplate = document.getElementById("task-template").content;

	taskForm.addEventListener("submit", (evt) => {
		evt.preventDefault();
		let newItemTask = taskTemplate.querySelector(".taskboard__item");
		let taskDescription = taskTemplate.querySelector(".task__view");
		let taskInputTemplates = taskTemplate.querySelector(".task__input");
		taskDescription.textContent = newTaskField.value;
		taskInputTemplates.value = newTaskField.value;
		let task = newItemTask.cloneNode(true);
		mainList.appendChild(task);
		newTaskField.value = "";
		listTasks.forEach(element => {
			if (element.children.length > 1) {
				let emptyThisSubmit = element.querySelector(".task--empty");
				emptyThisSubmit.classList.add("task--invisible");
			}
		});
	});
};

export default addTask()