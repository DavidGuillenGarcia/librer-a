let title;
let author;
let publishYear;
let genre;
let cover;

const getBooksFiltered = (filterType, filter) => {
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
        title = "Title: " + data.docs[i].title;
        author = "Authors: " + data.docs[i].author_name;
        publishYear = "First publish year: " + data.docs[i].first_publish_year;
        genre = "";
        cover = `https://covers.openlibrary.org/b/olid/${data.docs[i].cover_edition_key}-M.jpg`;
      }
      console.log(title, author, publishYear, genre, cover);
      console.log(data);
    });
};

const createBook = (title, author, year, genre, cover) => {};

getBooksFiltered("author", "Rowling");

const getFilter = () => {};
