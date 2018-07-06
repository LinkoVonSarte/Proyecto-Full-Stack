const bookInstances = (state = [], action) => {
  switch (action.type) {
    case 'GET_BOOKINSTANCES_SUCCESS':
      return action.bookInstances
    default:
      return state;
  }
}

export default bookInstances;
