const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks on startup
document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  addTask(taskText);
  taskInput.value = '';
  saveTasks();
});

function addTask(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;

  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('deleteBtn');
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    JSON.parse(saved).forEach(task => addTask(task.text, task.completed));
  }
}