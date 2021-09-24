'use strict'

// Перемещение задач

let draggedTask = function () {
	let listTasks = document.querySelectorAll(".taskboard__list");
	let items = document.getElementsByClassName("taskboard__item");
	let taskList = document.querySelector(".taskboard");
	let buttonClear = document.querySelector(".button--clear");

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
			let elStartDraggable = evt.target;
			elStartDraggable.classList.add("task--dragged");
			
			if (element.children.length <= 2) {
				let emptyThisInvisibleStart = element.querySelector(".task--empty");
				emptyThisInvisibleStart.classList.remove("task--invisible");
			};

			if (element.children.length <= 2 && element.classList.contains("taskboard__list--trash")) {
				buttonClear.setAttribute("disabled", "disabled");
			}
		});

		element.addEventListener("dragend", (evt) => {
			let elEndDraggable = evt.target;
			elEndDraggable.classList.remove("task--dragged");
			if (element.children.length > 1) {
				let emptyThisVisibleEnd = element.querySelector(".task--empty");
				emptyThisVisibleEnd.classList.add("task--invisible");
			};

			if (element.children.length > 1 && element.classList.contains("taskboard__list--trash")) {
				buttonClear.removeAttribute("disabled", "disabled");
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

			if (element.classList.contains("taskboard__list--sorted")) {
				activeElement.classList.remove("task--done", "task--basket");
				activeElement.classList.add("task--processing");
			} else if (element.classList.contains("taskboard__list--done")) {
				activeElement.classList.remove("task--processing", "task--basket");
				activeElement.classList.add("task--done");
			} else if (element.classList.contains("taskboard__list--trash")) {
				activeElement.classList.remove("task--processing", "task--done");
				activeElement.classList.add("task--basket");
			} else if (element.classList.contains("taskboard__list--backlog")) {
				activeElement.classList.remove("task--processing", "task--done", "task--basket");
			};

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

export default draggedTask()