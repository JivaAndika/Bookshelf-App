// Do your work here...
const searchForm = document.getElementById("searchBook");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault(); 
  searchBook();
});

function loadPage() {
  const books = JSON.parse(localStorage.getItem("book")) || [];
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add(
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow-md",
      "text-gray-800"
    );
    bookItem.innerHTML = `
    <h3 class="text-lg font-bold">${book.title}</h3>
      <p class="text-sm">Penulis: ${book.author}</p>
      <p class="text-sm">Tahun: ${book.year}</p>
      <div class="flex space-x-2 mt-3">
        <button onclick="toggleBook(${
          book.id
        })" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
          ${book.check ? "↩ Pindahkan ke Belum Selesai" : "✔ Selesai"}
        </button>
        <button onclick="deleteBook(${
          book.id
        })" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
          🗑 Hapus
        </button>
      </div>`;

    if (book.check) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
}
function searchBook() {
  let books = JSON.parse(localStorage.getItem("book")) || [];
  const searchSubmit = document.getElementById("searchBookTitle").value.toLowerCase();
  let filteredTitle = books.filter((book) => book.title.toLowerCase().includes(searchSubmit));
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";
  
  filteredTitle.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add(
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow-md",
      "text-gray-800"
    );
    bookItem.innerHTML = `
      <h3 class="text-lg font-bold">${book.title}</h3>
      <p class="text-sm">Penulis: ${book.author}</p>
      <p class="text-sm">Tahun: ${book.year}</p>
      <div class="flex space-x-2 mt-3">
        <button onclick="toggleBook(${book.id})" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
          ${book.check ? "↩ Pindahkan ke Belum Selesai" : "✔ Selesai"}
        </button>
        <button onclick="deleteBook(${book.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
          🗑 Hapus
        </button>
      </div>`;

    if (book.check) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
}
function deleteBook(bookId) {
  let books = JSON.parse(localStorage.getItem("book")) || [];
  books = books.filter((book) => book.id !== bookId);
  localStorage.setItem("book", JSON.stringify(books));
  loadPage();
}
function toggleBook(bookId) {
  const books = JSON.parse(localStorage.getItem("book")) || [];
  books.map((book) => {
    if (book.id === bookId) {
      book.check = !book.check;
    }
    return book;
  });
  localStorage.setItem("book", JSON.stringify(books));
  loadPage();
}
const form = document.getElementById("bookForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const check = document.getElementById("bookFormIsComplete").checked;
  const books = JSON.parse(localStorage.getItem("book")) || [];
  const book = {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    check: check,
  };
  books.push(book);
  localStorage.setItem("book", JSON.stringify(books));
  loadPage();
  form.reset();
});
document.addEventListener("DOMContentLoaded", loadPage);
