const library = [];

function render() {
  const libraryEl = document.querySelector("#library");
  libraryEl.innerHTML = "";
  for (let i = 0; i < library.length; i += 1) {
    const book = library[i];
    const bookEl = document.createElement("div");
    bookEl.setAttribute("class", "book-card");
    bookEl.innerHTML = `
        <div class="book-header">
          <h3 class ="book-title">${book.title}</h3>
          <h5 class ="book-author">by ${book.author}</h5>
        </div>
        <div class="book-body">
          <p>${book.pages} pages</p>
          <p class="book-status">${book.read ? "Read" : "Not Read Yet"}</p>
          <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
          <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
        </div>
      `;
    libraryEl.appendChild(bookEl);
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

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  render();
}

const newBookForm = document.querySelector("#new-book-form");
const newBookbtn = document.querySelector("#new-book-btn");
newBookbtn.addEventListener("click", () => {
//   alert("HELLOW WORLD");
  newBookForm.style.display = "block";
});

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});

document.addEventListener("mouseup", (event) => {
  if (event.target !== newBookForm && event.target.parentNode !== newBookForm) {
    newBookForm.style.display = "none";
  }
});

// For testing
library.push(new Book("Hobbit", "hi", 4, "true"));
library.push(new Book("Hobbit1", "hi", 4, "true"));
library.push(new Book("Hobbit2", "hi", 4, "true"));
library.push(new Book("Hobbit3", "hi", 4, "true"));
library.push(new Book("Hobbit4", "hi", 4, "true"));
library.push(new Book("Hobbit5", "hi", 4, "true"));
render();
