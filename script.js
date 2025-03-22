document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task');
    const taskDescription = taskInput.value;
    
    fetch('/api/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descricao: taskDescription })
    })
    .then(response => response.json())
    .then(data => {
        const li = document.createElement('li');
        li.textContent = data.descricao;
        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';
    })
    .catch(error => console.error('Erro:', error));
});

// Carregar tarefas ao abrir a página
window.onload = function() {
    fetch('/api/tarefas')
    .then(response => response.json())
    .then(data => {
        const taskList = document.getElementById('taskList');
        data.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.descricao;
            taskList.appendChild(li);
        });
    })
    .catch(error => console.error('Erro:', error));
};
