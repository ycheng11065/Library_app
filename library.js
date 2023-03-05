const library = [];
const bookSet = new Set();

function setReadColor(book, index) {
  const currBook = document.querySelector(`#book-${index}`);
  if (book.read) {
    currBook.style.backgroundColor = "#7F00FF";
    currBook.style.color = "white";
  } else {
    currBook.style.background = "linear-gradient(to bottom right, #282828, #6F6F6F)";
    currBook.style.color = "white";
  }
}

// Renders all book objects within library array
function render() {
  const libraryEl = document.querySelector("#library");
  libraryEl.innerHTML = "";
  for (let i = 0; i < library.length; i += 1) {
    const book = library[i];
    const bookEl = document.createElement("div");
    bookEl.setAttribute("class", "book-card");
    bookEl.setAttribute("id", `book-${i}`);
    bookEl.innerHTML = `
        <span class="x-btn">
            <ion-icon name="close-outline"></ion-icon>
        </span
        <div class="book-header">
          <h3 class ="book-title">${book.title}</h3>
          <h5 class ="book-author">by ${book.author}</h5>
        </div>
        <div class="book-body">
          <p class="book-page">${book.pages} pages</p>
          <p class="book-status">${book.read ? "Read" : "Not Read Yet"}</p>
          <button class="remove-btn" onclick="displayAlert(${i})">Remove</button>
          <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
        </div>
      `;
    libraryEl.appendChild(bookEl);
    // document.querySelector(`#book-${i}`).style.backgroundColor = "blue";
    setReadColor(book, i);
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// eslint-disable-next-line
function toggleRead(index) {
  library[index].toggleRead();
  render();
}

// eslint-disable-next-line
function removeBook(index) {   
  console.log(library[index].title);
  library.splice(index, 1);
  render();
}

// Add new book object to library array
function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  bookSet.add(title);
  render();
}

let isDragging = false;
let startX; let startY;
const newBookForm = document.querySelector("#new-book-form");
const newBookbtn = document.querySelector("#new-book-btn");
const titleInput = document.querySelector("#title");

// Allow submit button to submit
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const currTitle = document.querySelector("#title");
  const currAuthor = document.querySelector("#author");
  const currPage = document.querySelector("#pages");

  const inputValue = currTitle.value.trim();
  const authorValue = currAuthor.value.trim();
  const pageValue = currPage.value.trim();
  const emptyMsg = document.querySelector("#field-empty");

  if (inputValue === "" || authorValue === "" || pageValue === "") {
    emptyMsg.style.display = "block";
    return;
  }
  if (bookSet.has(titleInput.value.trim())) {
    const existAlert = document.querySelector("#field-exists");
    existAlert.style.display = "block";
  }
  emptyMsg.style.display = "none";
  addBookToLibrary();
});

// open add book window when newBook button is pressed
newBookbtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (newBookForm.style.display === "block") {
    newBookForm.style.display = "none";
  } else {
    newBookForm.style.display = "block";
  }
});

// Records dragging mouse down location
document.addEventListener("mousedown", (event) => {
  isDragging = false;
  startX = event.clientX;
  startY = event.clientY;
});

// Determines how far the cursor is from its last mousedown event
document.addEventListener("mousemove", (event) => {
  if (Math.abs(event.clientX - startX) > 5 || Math.abs(event.clientY - startY) > 5) {
    isDragging = true;
  }
});

// Close add book window by clicking outside window
["mouseup", "keydown"].forEach((eventType) => {
  document.addEventListener(eventType, (event) => {
    if (event.target === newBookbtn) {
      return;
    }
    if (eventType === "keydown") {
      if (event.keyCode === 27) {
        newBookForm.style.display = "none";
      } else {
        return;
      }
    }

    if (isDragging || event.clientX !== startX || event.clientY !== startY) {
      return;
    }

    if (!newBookForm.contains(event.target)) {
      newBookForm.style.display = "none";
    }

    isDragging = false;
  });
});

// Displays confirmation alert for deleting book
// eslint-disable-next-line
function displayAlert(index) {
  Swal.fire({   // eslint-disable-line
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    iconColor: "#3085d6",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      removeBook(index);
    }
  });
}

// Shows alert if input title already exists
titleInput.addEventListener("blur", () => {
  const existAlert = document.querySelector("#field-exists");
  if (titleInput.value.trim() !== "") {
    if (bookSet.has(titleInput.value.trim())) {
      existAlert.style.display = "block";
    } else {
      existAlert.style.display = "none";
    }
  }
});

for (let i = 0; i < 25; i += 1) {
  library.push(new Book("book1", "Charles", 60, false));
  bookSet.add("book1");
}

render();
