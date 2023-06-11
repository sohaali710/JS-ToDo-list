import { setCookie, getAllCookies, getCookie, deleteCookie } from "./cookies.js";

let addBtn = document.getElementById('add');
let taskInput = document.getElementById("myInput");
let addedTasks = document.getElementById("addedTasks");

let todoItem = '';
let isDone = false

if (getAllCookies()) {
    let allCookies = getAllCookies()
    delete allCookies['_dd_s']
    // console.log(allCookies)

    for (let key in allCookies) {
        if (allCookies[key]) {
            isDone = JSON.parse(allCookies[key]).isDone

            if (!isDone) {
                todoItem = `
            <span id="child">
                <span id="${key}">
                    ${JSON.parse(allCookies[key]).val}
                </span>
                <span>
                    <button id="done">Done</button>
                    <button id="deleteTask">Delete</button>
                </span>
            </span>
        `;
            } else {
                todoItem = `
            <span id="child">
                <span id="${key}" class="line-through">
                    ${JSON.parse(allCookies[key]).val}
                </span>
                <span>
                    <button id="done">Done</button>
                    <button id="deleteTask">Delete</button>
                </span>
            </span>
        `;
            }

            addedTasks.innerHTML += todoItem;
        }
    }
}

addBtn.onclick = function () {
    if (taskInput.value) {
        todoItem = `
            <span id="child">
                <span id="${taskInput.value}Task">
                    ${taskInput.value}
                </span>
                <span>
                    <button id="done">Done</button>
                    <button id="deleteTask">Delete</button>
                </span>
            </span>
        `;

        addedTasks.innerHTML += todoItem;

        // console.log(taskInput.value)
        const task = { 'val': taskInput.value, 'isDone': false }
        setCookie(`${taskInput.value}Task`, JSON.stringify(task))

        taskInput.value = "";

    } else {
        alert("Please enter the task name.");
    }
};


let deleteTask = [];

addedTasks.addEventListener('click', (e) => {
    deleteTask = document.querySelectorAll("#deleteTask")

    if (e.target.matches('#done')) {
        let taskToDone = e.target.parentElement.previousElementSibling
        let taskName = e.target.parentElement.parentElement.children[0].getAttribute('id')
        console.log(taskName)

        isDone = JSON.parse(getCookie(taskName)).isDone

        if (!isDone) {
            taskToDone.classList.add('line-through')
            isDone = true
        } else {
            taskToDone.classList.remove('line-through')
            isDone = false
        }

        const task = { 'val': JSON.parse(getCookie(taskName)).val, 'isDone': isDone }
        setCookie(taskName, JSON.stringify(task))
    }

    if (e.target.matches('#deleteTask')) {
        let taskToDelete = e.target.parentElement.parentElement
        let taskName = taskToDelete.children[0].getAttribute('id')

        taskToDelete.remove();
        deleteCookie(taskName)
    }
})
