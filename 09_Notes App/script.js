let notes = JSON.parse(localStorage.getItem('notes')) || []
let editIndex = -1; 

const input = document.getElementById('inputNote')
const btn = document.getElementById('addNote')
const list = document.getElementById('noteList')

// render Notes
function renderNotes(){
    list.innerHTML = '';
    notes.forEach((note, index)=>{
      const li = document.createElement('li'); 
      li.innerHTML = `
      <span>${note}</span> 
      <div class="actions">
       <button data-edit='${index}'>Edit</button>
       <button data-delete ='${index}'>Delete</button>
      </div>
      `;
      list.appendChild(li);
    });

    // save to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Update button text 
    btn.textContent = (editIndex === -1) ? 'Add Note' : 'Update';
}

// Add notes
btn.addEventListener('click', ()=>{
    const inputText = input.value;

    if (inputText === ''){
        alert('Please enter your notes');
        return;
    }

    if(editIndex === -1){
        // create
        notes.push(inputText); 
    } else {
        // update
        notes[editIndex] = inputText;
        editIndex = -1;
    }
    
    input.value = ''; 
    renderNotes(); 
})

// Delete+edit noted (event delegation)
list.addEventListener('click', (e)=>{
    // delete
    if(e.target.hasAttribute('data-delete')){
        const index = e.target.getAttribute('data-delete');

        notes.splice(index, 1)
        renderNotes();
    }

    // edit
    if(e.target.hasAttribute('data-edit')){
        const index = e.target.getAttribute('data-edit')
        input.value = notes[index]; 
        editIndex = index; 
        btn.textContent = 'Update';
    }
})
renderNotes()