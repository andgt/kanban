'use strict'

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

export default editTask()