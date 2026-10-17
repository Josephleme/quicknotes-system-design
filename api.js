const API_URL = "https://typicode.com";

const loadBtn = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const notesList = document.getElementById("notes-list");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitBtn = document.getElementById("submit-btn");

loadBtn.addEventListener("click", loadNotes);

async function request(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
    }
    return response;
}

function setActionStates(isLoading) {
    loadBtn.disabled = isLoading;
    submitBtn.disabled = isLoading;
}

function updateStatusMessage(text, className) {
    statusText.textContent = text;
    statusText.className = className;
}

function createNoteElement(id, title, body) {
    const li = document.createElement("li");
    li.setAttribute("data-id", id);

    const noteContent = document.createElement("div");
    
    const h3 = document.createElement("h3");
    h3.textContent = title;
    
    const p = document.createElement("p");
    p.textContent = body || "";

    noteContent.appendChild(h3);
    noteContent.appendChild(p);
    li.appendChild(noteContent);

    return li;
}

async function loadNotes() {
    setActionStates(true);
    updateStatusMessage("Loading notes...", "status-loading");
    notesList.innerHTML = "";

    try {
        const response = await request(`${API_URL}?_limit=10`);
        const notes = await response.json();

        if (notes.length === 0) {
            updateStatusMessage("No notes found.", "status-success");
            const emptyLi = document.createElement("li");
            emptyLi.textContent = "Your notes directory is empty.";
            notesList.appendChild(emptyLi);
            return;
        }

        notes.forEach(note => {
            const li = createNoteElement(note.id, note.title, note.body);
            notesList.appendChild(li);
        });

        updateStatusMessage(`Loaded ${notes.length} notes from the server.`, "status-success");
    } catch (error) {
        updateStatusMessage(`Failed to load notes: ${error.message}`, "status-error");
    } finally {
        setActionStates(false);
    }
}
