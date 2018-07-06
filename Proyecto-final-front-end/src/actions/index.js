import axios from 'axios';

//GÉNEROS
export const getGenres = () => {
    return dispatch => {
        dispatch(getGenresRequest());

        axios.get(`http://localhost:3001/catalog/genres`)
        .then((response) => {
          console.log(response);
          dispatch(getGenresSuccess(response.data.genre_list));
        })
        .catch((error) => {
          dispatch(getGenresError(error));
        });
    };
}

function getGenresRequest() {
    return {
        type: 'GET_GENRES_REQUEST',
        isFetching: true
    };
}

function getGenresSuccess (genres) {
    return {
        type: 'GET_GENRES_SUCCESS',
        isFetching: false,
        error: false,
        genres
    };
}

function getGenresError(errorMessage) {
    return {
        type: 'GET_GENRES_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


export const createGenre = (name) => {
    return dispatch => {
        dispatch(createGenreRequest());

        axios.post(`http://localhost:3001/catalog/genre/create`, {
          name
        })
        .then((response) => {
          console.log(response);
          dispatch(createGenreSuccess(response.data));
        })
        .catch((error) => {
          dispatch(createGenreError(error));
        });
    };
}

function createGenreRequest() {
    return {
        type: 'GENRE_CREATION_REQUEST',
        isFetching: true
    };
}

function createGenreSuccess (newGenre) {
    return {
        type: 'GENRE_CREATION_SUCCESS',
        isFetching: false,
        error: false,
        newGenre
    };
}

function createGenreError(errorMessage) {
    return {
        type: 'GENRE_CREATION_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

export const updateGenre = (id, name) => {
    return dispatch => {
        dispatch(updateGenreRequest());

        axios.put(`http://localhost:3001/catalog/genre/${id}/update`, {
          name
        })
        .then((response) => {
          console.log(response);
          dispatch(updateGenreSuccess(response.data));
        })
        .catch((error) => {
          dispatch(updateGenreError(error));
        });
    };
}

function updateGenreRequest() {
    return {
        type: 'UPDATE_GENRE_REQUEST',
        isFetching: true
    };
}

function updateGenreSuccess (genre, name) {
    return {
        type: 'UPDATE_GENRE_SUCCESS',
        isFetching: false,
        error: false,
        genre,
        name
    };
}

function updateGenreError(errorMessage) {
    return {
        type: 'UPDATE_GENRE_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

export const deleteGenre = (id) => {
    return dispatch => {
        dispatch(deleteGenreRequest());

        axios.delete(`http://localhost:3001/catalog/genre/${id}/delete`)
        .then((response) => {
          console.log('response de delete');
          console.log(response);
          console.log('response.data de delete');
          console.log(response.data);
          dispatch(deleteGenreSuccess(response.data));
        })
        .catch((error) => {
          dispatch(deleteGenreError(error));
        });
    };
}

function deleteGenreRequest() {
    return {
        type: 'DELETE_GENRE_REQUEST',
        isFetching: true
    };
}

function deleteGenreSuccess (deletedGenre) {
    return {
        type: 'DELETE_GENRE_SUCCESS',
        isFetching: false,
        error: false,
        deletedGenre
    };
}

function deleteGenreError(errorMessage) {
    return {
        type: 'DELETE_GENRE_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

//BOOKS
export const getBooks = () => {
    return dispatch => {
        dispatch(getBooksRequest());

      /*  //ELIMINAR
        const librosData = {
          "book_list": [
      {
          "_id": "5b1162566519d51d64341cec",
          "title": "Apes and Angels",
          "author": {
              "_id": "5b1162516519d51d64341ce2",
              "first_name": "Ben",
              "family_name": "Bova",
              "date_of_birth": "1932-11-07T23:00:00.000Z",
              "__v": 0
          }
      },
      {
          "_id": "5b1162566519d51d64341cea",
          "title": "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
          "author": {
              "_id": "5b1162516519d51d64341ce1",
              "first_name": "Patrick",
              "family_name": "Rothfuss",
              "date_of_birth": "1973-06-06T00:00:00.000Z",
              "__v": 0
          }
      },
      {
          "_id": "5b1162566519d51d64341ceb",
          "title": "The Slow Regard of Silent Things (Kingkiller Chronicle)",
          "author": {
              "_id": "5b1162516519d51d64341ce1",
              "first_name": "Patrick",
              "family_name": "Rothfuss",
              "date_of_birth": "1973-06-06T00:00:00.000Z",
              "__v": 0
          }
      },
      {
          "_id": "5b1162566519d51d64341ced",
          "title": "Death Wave",
          "author": {
              "_id": "5b1162516519d51d64341ce2",
              "first_name": "Ben",
              "family_name": "Bova",
              "date_of_birth": "1932-11-07T23:00:00.000Z",
              "__v": 0
          }
      },

    ]};
          dispatch(getBooksSuccess(librosData.book_list));*/

        axios.get(`http://localhost:3001/catalog/books`)
        .then((response) => {
          console.log(response);
          dispatch(getBooksSuccess(response.data.book_list));
        })
        .catch((error) => {
          dispatch(getBooksError(error));
        });
    };
}

function getBooksRequest() {
    return {
        type: 'GET_BOOKS_REQUEST',
        isFetching: true
    };
}

function getBooksSuccess (books) {
    return {
        type: 'GET_BOOKS_SUCCESS',
        isFetching: false,
        error: false,
        books
    };
}

function getBooksError(errorMessage) {
    return {
        type: 'GET_BOOKS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

//AUTHORS
export const getAuthors = () => {
    return dispatch => {
        dispatch(getAuthorsRequest());

      /*  //ELIMINAR
        const authorsData = {
          "author_list": [
          {
              "_id": "5b1162516519d51d64341ce3",
              "first_name": "Isaac",
              "family_name": "Asimov",
              "date_of_birth": "1920-01-02T00:00:00.000Z",
              "date_of_death": "1992-04-06T00:00:00.000Z",
              "__v": 0
          }]
        };

        dispatch(getAuthorsSuccess(authorsData.author_list))*/

        axios.get(`http://localhost:3001/catalog/authors`)
        .then((response) => {
          console.log(response);
          dispatch(getAuthorsSuccess(response.data.author_list));
        })
        .catch((error) => {
          dispatch(getAuthorsError(error));
        });
    };
}

function getAuthorsRequest() {
    return {
        type: 'GET_AUTHORS_REQUEST',
        isFetching: true
    };
}

function getAuthorsSuccess (authors) {
    return {
        type: 'GET_AUTHORS_SUCCESS',
        isFetching: false,
        error: false,
        authors
    };
}

function getAuthorsError(errorMessage) {
    return {
        type: 'GET_AUTHORS_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}

export const createAuthor = (first_name, family_name, date_of_birth, date_of_death) => {
    return dispatch => {
        dispatch(createAuthorRequest());

        axios.post(`http://localhost:3001/catalog/author/create`, {
          first_name,
          family_name,
          date_of_birth,
          date_of_death
        })
        .then((response) => {
          console.log('Aquí response');
          console.log(response);
          dispatch(createAuthorSuccess(response.data));
        })
        .catch((error) => {
          dispatch(createAuthorError(error));
        });
    };
}

function createAuthorRequest() {
    return {
        type: 'AUTHOR_CREATION_REQUEST',
        isFetching: true
    };
}

function createAuthorSuccess (newAuthor) {
    return {
        type: 'AUTHOR_CREATION_SUCCESS',
        isFetching: false,
        error: false,
        newAuthor
    };
}

function createAuthorError(errorMessage) {
    return {
        type: 'AUTHOR_CREATION_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}


//BOOKINSTANCES
export const getBookInstances = () => {
    return dispatch => {
        dispatch(getBookInstancesRequest());

        axios.get(`http://localhost:3001/catalog/bookinstances`)
        .then((response) => {
          console.log(response);
          dispatch(getBookInstancesSuccess(response.data.bookinstance_list));
        })
        .catch((error) => {
          dispatch(getBookInstancesError(error));
        });
    };
}

function getBookInstancesRequest() {
    return {
        type: 'GET_BOOKINSTANCES_REQUEST',
        isFetching: true
    };
}

function getBookInstancesSuccess (bookInstances) {
    return {
        type: 'GET_BOOKINSTANCES_SUCCESS',
        isFetching: false,
        error: false,
        bookInstances
    };
}

function getBookInstancesError(errorMessage) {
    return {
        type: 'GET_BOOKINSTANCES_ERROR',
        isFetching: false,
        error: true,
        errorMessage
    };
}
