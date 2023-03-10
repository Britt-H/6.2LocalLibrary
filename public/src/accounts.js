function findAccountById(accounts, id) {
  const result = accounts.find((accountObj)=> {
    return accountObj.id === id
  })
  return result
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA['name'].last.toLowerCase() < accountB['name'].last.toLowerCase() ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
    //make a borrow counter
    let borrowCount = 0;
    //find account id
    const accountId = account.id;
    //loop through the books array
    for (const book in books) {
      const borrowId = books[book].borrows;
      const borrowIdArray = borrowId.reduce((accumulator, {id}) => {
        accumulator.push(id);
        return accumulator;
      }, []);
      //every time a book borrow id matches account id, counter ++
      if (borrowIdArray.includes(accountId)) {
        borrowCount++;
      }
    }
    //return counter
    return borrowCount;
  }

//ChatGPT Optimization
// function getTotalNumberOfBorrows(account, books) {
//   const accountId = account.id;
//   let borrowCount = 0;
  
//   for (const book of books) {
//     if (book.borrows.some(({ id }) => id === accountId)) {
//       borrowCount++;
//     }
//   }
  
//   return borrowCount;
// }

function getBooksPossessedByAccount(account, books, authors) {
  //accountid constant
  const accountId = account.id
  //Get books returned by accountId
  const borrowedBooks = books.filter((book) => {
    //List of borrowed books
    const borrowed = book.borrows.some((borrow) => {
      //When ID's match between book.borrow.id & account.id and returned=false return true
      return borrow.id === accountId && borrow.returned === false
    })
    return borrowed
  })

  borrowedBooks.forEach(book => {
    const authorId = book.authorId
    const author = authors.find(author => author.id === authorId)
      book.author = author;
  });

return borrowedBooks
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

