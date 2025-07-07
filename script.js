// 找到按钮和输入框
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// 添加任务按钮事件监听器
addButton.addEventListener('click', function () {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    // 添加完成按钮
    const doneBtn = document.createElement('button');
    doneBtn.textContent = '完成';
    doneBtn.className = 'done-button';
    doneBtn.style.marginLeft = '10px';
    doneBtn.addEventListener('click', () => {
      newTask.style.textDecoration = 'line-through';
      saveTasks();
    });

    // 添加删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.className = 'delete-button';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(newTask);
      saveTasks();
    });

    newTask.appendChild(doneBtn);
    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);

    taskInput.value = ''; // 清空输入框
    saveTasks(); // ✅ 最后保存
  }
});

// 正确版本的 saveTasks
function saveTasks() {
  const tasks = [];

  document.querySelectorAll('#task-list li').forEach(li => {
    const taskTextNode = Array.from(li.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    if (taskTextNode) {
      tasks.push({
        text: taskTextNode.textContent.trim(),
        completed: li.style.textDecoration === 'line-through'
      });
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 页面加载时恢复任务
window.addEventListener('load', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  savedTasks.forEach(task => {
    const newTask = document.createElement('li');
    newTask.textContent = task.text;

    if (task.completed) {
      newTask.style.textDecoration = 'line-through';
    }

    const doneBtn = document.createElement('button');
    doneBtn.textContent = '完成';
    doneBtn.className = 'done-button';
    doneBtn.style.marginLeft = '10px';
    doneBtn.addEventListener('click', () => {
      newTask.style.textDecoration = 'line-through';
      saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.className = 'delete-button';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(newTask);
      saveTasks();
    });

    newTask.appendChild(doneBtn);
    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);
  });
});