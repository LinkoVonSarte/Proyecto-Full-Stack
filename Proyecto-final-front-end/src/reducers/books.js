const books = (state = [], action) => {
  switch (action.type) {
    case 'GET_BOOKS_SUCCESS':
    return action.books
    default:
      return state;
  }
}

export default books;
