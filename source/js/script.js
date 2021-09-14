'use strict'

let taskForm = document.querySelector(".add-task__form");
let newTaskField = document.getElementById("add-task");
let mainList = document.querySelector(".taskboard__list");

let taskTemplate = document.getElementById("task-template").content;

let newItemTask = taskTemplate.querySelector(".taskboard__item");

taskForm.addEventListener("submit", (evt) => {
	evt.preventDefault();
	let newTaskText = taskTemplate.querySelector(".task__view");
	let newTaskValue = newTaskField.value;
	let taskDescription = taskTemplate.querySelector(".task__view");
	taskDescription.textContent = newTaskValue;
	let task = newItemTask.cloneNode(true);
	mainList.appendChild(task);
});