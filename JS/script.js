const searchInput = document.getElementById("search_value");
const searchBtn = document.getElementById("search_button");
const booksContainer = document.getElementById("main_books");
const selectedFilter = document.getElementById("search_select");
const regex = /(\d+)/g;
let currentFilter = "title";
let cover;

const getBooksFiltered = (filterType, filter) => {
  clearLastSearch();

  fetch(
    "https://openlibrary.org/search.json?" +
      filterType +
      "=" +
      filter +
      "&limit=10"
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.docs.length; i++) {
        if (!data.docs[i].cover_edition_key) {
          cover = "./sources/image/libros.png";
        } else {
          cover = `https://covers.openlibrary.org/b/olid/${data.docs[i].cover_edition_key}-M.jpg`;
        }
        createBook(
          data.docs[i].title,
          data.docs[i].author_name,
          data.docs[i].first_publish_year,
          cover,
          i
        );
        let addBtn = document.getElementById("button" + i);
        addBtn.addEventListener("click", addBookToCart);
      }
      console.log(data.docs);
    });
};

const createBook = (title, author, year, cover, index) => {
  booksContainer.innerHTML += `
      <article class="book">
        <img class="image_bookc" src="${cover}" alt="" />
        <section>
          <h2 class="tittle">Title: <span id="book${index}">${title}</span></h2>
          <p class="publish">Published: ${year}</p>
          <p class="author">Author: ${author}</p>
          <button id="button${index}" class="button_add">Add</button>
        </section>
      </article>
   `;
};

const searchBook = () => {
  getBooksFiltered(currentFilter, searchInput.value);
};

const getFilter = (event) => {
  currentFilter = event.target.value;
};

const clearLastSearch = () => {
  booksContainer.innerHTML = "";
};

const addBookToCart = (event) => {
  let buttonID = event.taget.id.match(regex);
  let currentBook = document.getElementById("book" + buttonID);
  localStorage.setItem("cart", currentBook.innerText);
};

selectedFilter.addEventListener("change", getFilter);
searchBtn.addEventListener("click", searchBook);
