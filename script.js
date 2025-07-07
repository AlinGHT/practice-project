// 找到按钮和输入框
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// 给按钮添加点击事件监听器
addButton.addEventListener('click', function () {
  const taskText = taskInput.value.trim(); // 取输入框内容并去掉空格

  if (taskText !== '') {
    const newTask = document.createElement('li'); // 创建新任务元素
    newTask.textContent = taskText;
    saveTasks();
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
  }
});
function saveTasks() {
    const tasks = [];
  
    // 遍历所有任务 li，提取文本
    document.querySelectorAll('#task-list li').forEach(li => {
      tasks.push({
        text: li.firstChild.textContent.trim(),
        completed: li.style.textDecoration === 'line-through'
      });
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
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