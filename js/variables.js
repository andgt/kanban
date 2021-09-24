'use strict'

export default function variables () {
	let taskForm = document.querySelector(".add-task__form");
	let mainList = document.querySelector(".taskboard__group--backlog .taskboard__list");
	let taskList = document.querySelector(".taskboard");
	let items = document.getElementsByClassName("taskboard__item");
	let newTaskField = document.getElementById("add-task");
	let taskTemplate = document.getElementById("task-template").content;
	let listTasks = document.querySelectorAll(".taskboard__list");
	let buttonClear = document.querySelector(".button--clear");
}