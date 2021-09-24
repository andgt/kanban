'use strict'

// Удаление задач

let removeTasks = function () {
	let buttonClear = document.querySelector(".button--clear");

	buttonClear.addEventListener("click", (evt) => {
		let taskboardListBasket = document.querySelector(".taskboard__list--trash");
		let taskBasket = document.querySelectorAll(".task--basket");
		taskBasket.forEach(element => {
			taskboardListBasket.removeChild(element);
		});

		if (taskboardListBasket.children.length <= 2) {
			let emptyThisInvisibleStart = taskboardListBasket.querySelector(".task--empty");
			emptyThisInvisibleStart.classList.remove("task--invisible");
			buttonClear.setAttribute("disabled", "disabled");
		} else {
			return false;
		}
	})
}

export default removeTasks()