const getBooksFiltered = (filterType, filter) => {
  fetch(
    "https://openlibrary.org/search.json?" +
      filterType +
      "=" +
      filter +
      "&limit=5"
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.docs.length; i++) {
        console.log("Title: " + data.docs[i].title);
        console.log("Authors: " + data.docs[i].author_name);
        console.log("First publish year: " + data.docs[i].first_publish_year);
      }
      console.log(data);
    });
};

const createBook = (title, author, year, genre, image) => {};

getBooksFiltered("author", "Tolkien");

const getFilter = () => {};
