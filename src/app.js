import autoAnimate from "../node_modules/@formkit/auto-animate/index.mjs";

const submitButton = document.getElementById('submit-button');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

autoAnimate(taskList, {
  duration: 150,
  easing: 'ease-in-out',
  disrespectUserMotionPreference: false
})

let tasks
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.sort((a,b) => {
    if(a.completed === false && b.completed === true) return 1;
    else if (a.completed === true && b.completed === false) return -1;
    else return 0;
  })
}else tasks = [];

updateTaskList();

submitButton.addEventListener('click' , (e) => {
  e.preventDefault();
  const value = taskInput.value;
  const newTask = {text: value,completed: false};
  tasks.push(newTask);
  taskInput.value = '';
  addTaskToTaskList(newTask);
  localStorage.setItem('tasks',JSON.stringify(tasks));
});

function updateTaskList() {
  tasks.forEach((task) => {
    addTaskToTaskList(task);
  });
}

function addTaskToTaskList(task) {
  const taskListItem = document.createElement('li');
  const firstTaskChild = taskList.firstElementChild;
  taskListItem.innerHTML = `
    <li class="task-item">
      <p>
        ${task.text}
      </p>
      <button class="delete-button font-semibold text-lg outline-none">
        X
      </button>
    </li>`;
  if(task.completed == true) taskListItem.classList.add('completed-task-item');
  taskList.insertBefore(taskListItem,firstTaskChild);
  toggleTask(taskListItem,task);
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function toggleTask(taskListItem,task) {
  taskListItem.addEventListener('click', (event) => {
    console.log(event.currentTarget);
    if(event.target.tagName === 'BUTTON') {
      taskList.removeChild(event.currentTarget)
      tasks = tasks.filter((taskFromList) => taskFromList != task);
    }else {
      if(event.currentTarget.classList.contains('completed-task-item')){
        event.currentTarget.classList.remove('completed-task-item');
        task.completed = false;
        taskList.prepend(taskListItem);
      }else {
        event.currentTarget.classList.add('completed-task-item');
        task.completed = true;
        taskList.appendChild(taskListItem);
      }
      
    }
    updateLocalStorage();
  });
}

