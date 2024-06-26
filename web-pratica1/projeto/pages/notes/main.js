import { uuidv4 } from '../../utils/uuid.js';

//Elementos
const notesContainer = document.querySelector('#notes-container');
const noteInput = document.querySelector('#note-content');
const addNoteButton = document.querySelector('#add-note');

// Funções
function showNotes() {
  cleanNotes();
  getNotes().forEach((note) => {
    const noteElement = createNote(note.id, note.content, note.fixed);

    notesContainer.appendChild(noteElement);
  })
}

function cleanNotes() {
  notesContainer.replaceChildren([]);
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: uuidv4(),
    content: noteInput.value,
    fixed: false,
  };

  const noteElememt = createNote(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElememt);

  notes.push(noteObject);
  saveNotes(notes);
  noteInput.value = "";
}

function createNote(id, content, fixed) {
  const element = document.createElement("div");
  element.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.placeholder = "Adicione algum texto";
  element.appendChild(textarea);

  const pinIcon = document.createElement("i")
  pinIcon.classList.add(...["note-nav", "bi", "bi-pin"])
  element.appendChild(pinIcon);

  const deleteIcon = document.createElement("i")
  deleteIcon.classList.add(...["note-nav", "bi", "bi-x-lg"])
  element.appendChild(deleteIcon);


  if (fixed) {
    element.classList.add("fixed");
  }

  //Eventos dp elemento
  element.querySelector(".bi-pin").addEventListener("click", () => {
    toggleFixNote(id);
  })
  element.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNote(id, element);
  })

  return element;
}

function toggleFixNote(id) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id)[0];
  targetNote.fixed = !targetNote.fixed;
  saveNotes(notes);
  showNotes();
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  notesContainer.removeChild(element)
}

function copyNote(id) {
  const notes = getNotes();

  const targetNote = notes.filter((note) => note.id === id)[0];

  noteObject = {
    id: uuidv4(),
    content: targetNote.content,
    fixed: false,
  };
  const noteElememt = createNote(noteObject.id, noteObject.content, noteObject.fixed);
  notesContainer.appendChild(noteElememt);

  notes.push(noteObject);
  saveNotes(notes);
}

//Local Storage
function getNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

  return orderedNotes;
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

//Eventos
addNoteButton.addEventListener('click', () => addNote())

//Inicialização
showNotes();
