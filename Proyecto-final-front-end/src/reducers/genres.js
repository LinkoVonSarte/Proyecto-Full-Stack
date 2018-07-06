const genres = (state = [], action) => {

  const newGenreList = state.slice();

  switch (action.type) {
    case 'GET_GENRES_SUCCESS':
      return action.genres;

    case 'GENRE_CREATION_SUCCESS':
      return state.concat(action.newGenre);

    case 'DELETE_GENRE_SUCCESS':
      newGenreList.map((name) => {
        /*console.log('Aquí name');
        console.log(name);
        console.log('Aquí name id');
        console.log("111111"+name._id);
        console.log('Aquí newGenreList medio');
        console.log(newGenreList);
        console.log('Aquí action.deletedGenre');
        console.log("111111"+action.deletedGenre);*/
        if (name._id === action.deletedGenre) {
          return newGenreList.splice(newGenreList.indexOf(name), 1);
        }
        /*console.log('Aquí newGenreList medio');
        console.log(newGenreList);*/
      });
      /*console.log('Aquí newGenreList final')
      console.log(newGenreList);*/
      return newGenreList;

    /*case 'DELETE_GENRE_ERROR':
      console.log(action.errorMessage.response.data);*/

    case 'UPDATE_GENRE_SUCCESS':
      newGenreList.map((genre) => {
        if (genre._id === action.genre._id) {
          console.log(action.genre)
          return genre.name = action.genre.name;
        }
      });
      return newGenreList;

    default:
      return state;
  }
}

export default genres;
