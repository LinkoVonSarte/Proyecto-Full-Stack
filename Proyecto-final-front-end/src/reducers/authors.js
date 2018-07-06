const authors = (state = [], action) => {
  switch (action.type) {
    case 'GET_AUTHORS_SUCCESS':
      return action.authors;
    case 'AUTHOR_CREATION_SUCCESS':
      return state.concat(action.newAuthor);
    default:
      return state;
  }
}

export default authors;
