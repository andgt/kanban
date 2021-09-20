'use strict'

let taskForm = document.querySelector(".add-task__form");
let mainList = document.querySelector(".taskboard__group--backlog .taskboard__list");
let taskList = document.querySelector(".taskboard");
let items = document.getElementsByClassName("taskboard__item");
let newTaskField = document.getElementById("add-task");
let taskTemplate = document.getElementById("task-template").content;
let listTasks = document.querySelectorAll(".taskboard__list");

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
	listTasks.forEach(element => {
		if (element.children.length > 1) {
			let emptyThisSubmit = element.querySelector(".task--empty");
			emptyThisSubmit.classList.add("task--invisible");
		}
	});
});


// Режим редактирования задачи вкл/выкл.

let editTask = function (evt) {

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

// Перемещение задач

let draggedTask = function () {
	listTasks.forEach(element => {
		if (element.children.length < 2) {
			let emptyThisVisible = element.querySelector(".task--empty");
			emptyThisVisible.classList.remove("task--invisible");
		} else if (element.children.length > 1) {
			let emptyThisInvisible = element.querySelector(".task--empty");
			emptyThisInvisible.classList.add("task--invisible");
		}
		element.addEventListener("mouseover", (evt) => {
			for (let item of items) {
				item.classList.contains("task--empty") ?
				item.draggable = false :
				item.draggable = true;
			};
		});

		element.addEventListener("dragstart", (evt) => {
			evt.target.classList.add("task--dragged");
			if (element.children.length <= 2) {
				let emptyThisInvisibleStart = element.querySelector(".task--empty");
				console.log(emptyThisInvisibleStart);
				emptyThisInvisibleStart.classList.remove("task--invisible");
			}
		});

		element.addEventListener("dragend", (evt) => {
			evt.target.classList.remove("task--dragged");
			if (element.children.length > 1) {
				let emptyThisVisibleEnd = element.querySelector(".task--empty");
				emptyThisVisibleEnd.classList.add("task--invisible");
			}
		});

		element.addEventListener("dragover", (evt) => {
			evt.preventDefault();
			let activeElement = taskList.querySelector(".task--dragged");
			let currentElement = evt.target;
			let isMoveable = activeElement != currentElement && currentElement.classList.contains("taskboard__item");
			if (!isMoveable) {
				return;
			}
			let nextElement = getNextElement(evt.clientY, currentElement);
			if (nextElement && activeElement === nextElement.previousElementSibling || activeElement === nextElement) {
				return;
			}
			element.insertBefore(activeElement, nextElement);
		});
	});
	let getNextElement = (cursorPosition, currentElement) => {
		let currentElementCoord = currentElement.getBoundingClientRect();
		let currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
		let nextElement = (cursorPosition < currentElementCenter) ?
		currentElement :
		currentElement.nextSibling;
		return nextElement;
	};
};

draggedTask();