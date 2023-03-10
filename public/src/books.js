function findAuthorById(authors, id) {
  const result = authors.find((authorObj) => {
    return authorObj.id == id;
  })
  if (result === undefined) return null
  return result
}

function helperFindAuthorNameById(authors) {
  return `${authors.name.first} ${authors.name.last}`;
}

function findBookById(books, id) {
  const result = books.find((bookObj) => {
    return bookObj.id == id;
  });
  if (result === undefined) return null;
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => {
    const isBorrowed = book.borrows.some((borrow) => borrow.returned === false)
    return isBorrowed
  }) 

  const available = books.filter((book) => {
    const isAvailable = book.borrows.every((borrow) => borrow.returned === true)
    return isAvailable
  })
  return [borrowed, available]
}

function getBorrowersForBook(book, accounts) {
  //array for each book of all borrowers with information and return status
  const borrows = book.borrows
  //loop through books array
  const borrower = borrows.map((borrowsObj) => {
    //loop through accounts array
    const matchingAccount = accounts.find((account) => 
      //find if accounts id is equal to the books borrow id
      account.id === borrowsObj.id
    )
    return {...matchingAccount, returned: borrowsObj.returned}
  })
  return borrower.slice(0, 10)

}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  helperFindAuthorNameById,
};
