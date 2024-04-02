//Elementos 
const notesContainer = document.querySelector('#notes-container'); 
const noteInput = document.querySelector('#note-content');
const addNoteButton = document.querySelector('.add-note');

// Funções 
function addNote(){
  const notes = [];
  const noteObject = {
    id: generateID(),
    content: noteInput.value, 
    fixed: false,
  };

  const noteElememt = createNote(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElememt);

  notes.push(noteObject);
  saveNotes(notes);
  noteInput.value = "";
}

function generateID(){
  return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed){
  const element = document.createElement("div");
  element.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.placeholder = "Adicione algum texto";
  
  element.appendChild(textarea);
  return element;
}

function saveNotes(notes){
  localStorage.setItem("notes", JSON.stringify(notes));
} 



//Eventos 
addNoteButton.addEventListener('click', () => addNote() )