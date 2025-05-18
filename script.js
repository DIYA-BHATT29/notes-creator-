const noteInput = document.getElementById('noteInput');
const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}
themeToggle.onclick = () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
};
let notes = JSON.parse(localStorage.getItem('notes')) || [];
notes.forEach(createNoteElement);

function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === "") return;
  notes.push(noteText);
  localStorage.setItem('notes', JSON.stringify(notes));
  createNoteElement(noteText);
  noteInput.value = "";
}
function createNoteElement(text) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.innerText = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerText = '×';
  deleteBtn.onclick = () => deleteNote(noteDiv, text);

  noteDiv.appendChild(deleteBtn);
  notesContainer.appendChild(noteDiv);
}
function deleteNote(noteElement, text) {
  notesContainer.removeChild(noteElement);
  notes = notes.filter(n => n !== text);
  localStorage.setItem('notes', JSON.stringify(notes));
}
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const noteElements = document.querySelectorAll('.note');
  noteElements.forEach(note => {
    const text = note.innerText.toLowerCase();
    note.style.display = text.includes(query) ? 'block' : 'none';
  });
});
