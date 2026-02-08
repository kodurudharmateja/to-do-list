let todos = JSON.parse(localStorage.getItem('quantumTasks')) || [];

function render() {
  const container = document.getElementById('todoList');
  if (todos.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:rgba(255,255,255,0.3)"></p>`;
    return;
  }

  container.innerHTML = todos.map((t, i) => `
    <div class="todo-item ${t.done ? 'completed' : ''}">
      <div style="display:flex; align-items:center; gap:12px;">
        <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggle(${i})" style="width:20px; height:20px; cursor:pointer;">
        <div>
          <div style="color:white; font-weight:500;">${t.text}</div>
          <div style="color:rgba(255,255,255,0.4); font-size:0.75rem;">${t.date}</div>
        </div>
      </div>
      <button class="delete-btn" onclick="remove(${i})">Remove</button>
    </div>
  `).join('');
}

function addTodo() {
  const text = document.getElementById('taskInput').value;
  const date = document.getElementById('dateInput').value;

  if (!text || !date) return;

  todos.push({ text, date, done: false });
  update();
  document.getElementById('taskInput').value = '';
}

function toggle(i) {
  todos[i].done = !todos[i].done;
  update();
}

function remove(i) {
  const items = document.querySelectorAll('.todo-item');
  // Add a "fall away" effect
  items[i].style.transform = "translateY(20px) rotate(5deg) scale(0.9)";
  items[i].style.opacity = "0";
  items[i].style.transition = "0.4s ease";
  
  setTimeout(() => {
    todos.splice(i, 1);
    update();
  }, 400);
}

function update() {
  localStorage.setItem('quantumTasks', JSON.stringify(todos));
  render();
}

render();