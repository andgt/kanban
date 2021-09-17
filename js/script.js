'use strict'

let taskForm = document.querySelector(".add-task__form");
let mainList = document.querySelector(".taskboard__group--backlog .taskboard__list");
let newTaskField = document.getElementById("add-task");
let taskTemplate = document.getElementById("task-template").content;

// Добавляет новую задачу в список

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
});


// Режим редактирования задачи вкл/выкл.

let editTask = function (evt) {
	let items = document.getElementsByClassName("taskboard__item");

	document.addEventListener("click", (evt) => {
		let taskInputs = document.querySelectorAll(".task__input");
		let currentElement = evt.target;
		let itemTask = currentElement.parentElement;
		if (currentElement.classList.contains("task__edit")) {
			for (let item of items) {
				item.classList.remove("task--active");
				window.addEventListener("keydown", function (evt) {
					if (evt.keyCode === 27) {
					  item.classList.remove("task--active");
					}
				});
			};
			itemTask.classList.add("task--active");
		} else if (!currentElement.classList.contains("task__input")) {
			for (let item of items) {
				item.classList.remove("task--active");
			}
		}
		taskInputs.forEach(element => {
			element.addEventListener("input", (evt) => {
				let taskDescription = element.previousElementSibling;
				taskDescription.textContent = element.value;
			});
			element.addEventListener("keydown", function (evt) {
				if (evt.keyCode === 13) {
					for (let item of items) {
						item.classList.remove("task--active");
					}
				}
			});
		});
	});
};

editTask();


