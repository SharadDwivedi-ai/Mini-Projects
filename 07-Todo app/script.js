const input = document.getElementById('inputText')
const btn = document.getElementById('addBtn')
const task = document.getElementById('taskList')

btn.addEventListener('click', function () {
    const taskText = input.value.trim();
    if (taskText === '') {
        alert('Enter a Task')
        return;
    }
    // create a span and get the input field 
    const span = document.createElement('span')
    span.textContent = taskText;
    // Create a list and span attached under list
    const li = document.createElement('li')
    li.appendChild(span)

     // create delete button 
    const deletBtn = document.createElement('button')
    deletBtn.textContent = '🗑'
    deletBtn.classList.add('dltBtn')

    // delete button function 
    deletBtn.addEventListener('click', function () {
        li.remove();
    })

    // Button container
    const cont = document.createElement('div')
    cont.classList.add('btnGroup')

    // create edit button 
    const editBtn = document.createElement('button')
    editBtn.textContent = '✏️'

    // edit button function 
    editBtn.addEventListener('click', function () {
        const inputEdit = document.createElement('input')
        inputEdit.type = 'text';
        inputEdit.value = span.textContent

        const saveBtn = document.createElement('button')
        saveBtn.textContent = 'Save'

        // replace span to input field
        li.replaceChild(inputEdit, span)

        //replace edit with save (inside cont) 
        cont.replaceChild(saveBtn, editBtn)

        // save
        saveBtn.addEventListener('click', ()=>{
            const updateValue = inputEdit.value.trim()
            if(updateValue === ''){
                alert('Task cannot be Empty')
                return;
            }
            span.textContent = updateValue;

            // restore updated UI
            li.replaceChild(span, inputEdit)
            cont.replaceChild(editBtn, saveBtn)
        })
    })

     // Instead of clicking text only, allow clicking entire task:
    li.addEventListener('click', (e)=>{
        if(e.target.tagName === 'BUTTON') return; 
        span.classList.toggle('completed')
    })

    //Build structure 
    cont.appendChild(editBtn)
    cont.appendChild(deletBtn)   
    
    li.appendChild(span); 
    li.appendChild(cont);
   

    task.appendChild(li)

    input.value=('');
})
