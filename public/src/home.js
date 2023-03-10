function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = books.filter((book) => !book.borrows[0].returned);
  return result.length;
}

function getMostCommonGenres(books) {
  //build a list of the top 5 most common genres
  //build object of genres using reduce
  const genreCount = books.reduce((accumulator, book) => {
    //destructure genre from book
    const { genre } = book;
    if (accumulator[genre] === undefined) {
      accumulator[genre] = 1;
    } else {
      accumulator[genre] += 1;
    }
    return accumulator;
  }, {});
  //Sort most common genres high to low counts

  const popGenres = Object.entries(genreCount).map(([genreObj, count]) => ({
    name: genreObj,
    count,
  }));
  // console.log(JSON.stringify(popGenres))

  return popGenres
    .sort((popGenresA, popGenresB) => popGenresB.count - popGenresA.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookCount = books.reduce((accumulator, book) => {
    const { title } = book;
    const { borrows } = book;
    accumulator[title] = borrows.length;
    return accumulator;
  }, {});

  const popBooks = Object.entries(bookCount).map(([titleObj, count]) => ({
    name: titleObj,
    count,
  }));

  return popBooks
    .sort((popBooksA, popBooksB) => popBooksB.count - popBooksA.count)
    .slice(0, 5);
}

//Create helper function to do bulk of work for the query
function helperAuthorCountArray(books, authors) {
  //Create Empty Array for Author Names & Borrows Count
  const array = [];
  //Loop through each object in books
  books.forEach((book) => {
    //Loop through each object in authors
    authors.forEach((author) => {
      //Check if authorId from book is strictly equal to the id in Author
      if (book.authorId === author.id) {
        //Create Author Full Name Constant for current iteration
        const authorFullName = `${author.name.first} ${author.name.last}`;
        //Check if authorFullName exists in array and returns true or false
        const authorObj = array.find((authObj) => {
          authorFullName === authObj.name;
        });
        if (!authorObj) {
          //If authorFullName is False push the authorFullName & # of borrows (with keys) into array
          array.push({ name: authorFullName, count: book.borrows.length });
        } else {
          //If AuthorFullName is true, add the # of borrows to the existing objects count
          array.count += book.borrows.length;
        }
      }
    });
  });
  return array
}

function getMostPopularAuthors(books, authors) {
  //Call Helper to get list of authors and borrow count
  const popAuthors = helperAuthorCountArray(books, authors)
  //Return list sorted by borrow count & slice to only return top 5
  return popAuthors.sort((popAuthorsA, popAuthorsB) => popAuthorsB.count - popAuthorsA.count).slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
