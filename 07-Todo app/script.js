
const input = document.getElementById('inputText')
const btn = document.getElementById('addBtn')
const task = document.getElementById('taskList')

// Load from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// save to storage 
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    task.innerHTML = '';
    tasks.forEach((taskObj, index) => {
        // Create a list 
        const li = document.createElement('li')
        // create a span and get the input field 
        const span = document.createElement('span')
        span.textContent = taskObj.text;

        if (taskObj.completed) {
            span.classList.add('completed')
        }

        // Toggle Complete
        span.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        })

        // Button container
        const cont = document.createElement('div')
        cont.classList.add('btnGroup')

        // create edit button 
        const editBtn = document.createElement('button')
        editBtn.textContent = '✏️'
        editBtn.classList.add('edit-btn');

        // create delete button 
        const deletBtn = document.createElement('button')
        deletBtn.textContent = '🗑'
        deletBtn.classList.add('dltBtn')

        // delete button function 
        deletBtn.addEventListener('click', function () {
            tasks.splice(index, 1)
            saveTasks()
            renderTasks();
        })

        // edit button function 
        editBtn.addEventListener('click', function () {
            const inputEdit = document.createElement('input')
            inputEdit.value = taskObj.text;

            const saveBtn = document.createElement('button')
            saveBtn.textContent = 'Save'

            // replace span to input field
            li.replaceChild(inputEdit, span)

            //replace edit with save (inside cont) 
            cont.replaceChild(saveBtn, editBtn)

            // save
            saveBtn.addEventListener('click', () => {
                const updateValue = inputEdit.value.trim()
                if (updateValue === '') {
                    alert('Task cannot be Empty')
                    return;
                }
                tasks[index].text = updateValue;
                saveTasks();
                renderTasks();
            });
        });

        //Build structure 
        cont.append(editBtn, deletBtn)
        li.append(span, cont)
        task.appendChild(li)

    });
}

// add task
function addTask(){
    const text = input.value.trim(); 
    if(text=== ''){
        alert('Enter a Task');
        return;
    }
    tasks.push({
        text: text, 
        completed: false
    }); 
    saveTasks();
    renderTasks();
    input.value = ''; 
}

//  btn add events
 btn.addEventListener('click', addTask); 
 
 input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        addTask();
    }
 }); 

//  initial render
renderTasks();
 
