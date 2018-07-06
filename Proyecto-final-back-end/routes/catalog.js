const express = require('express');
const router = express.Router();

// Require controller modules.
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const bookInstanceController = require('../controllers/bookinstanceController');

//El orden en el que se definen las rutas importa. Siempre hay que poner la más larga para que matchee puesto que va cogiendo las rutas por orden. Si encuentra "/book" antes que "/books" nunca matcheará la segunda. por eso "/:id/delete" y create van antes que solo ":id", porque tolo lo que va detrás de la primera barra lo toma como "lo que sea" y tomaría la que primero matchee.

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', bookController.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
//router.get('/book/create', bookController.book_create_get); Lo eliminamos porque no puedes pasar/crear información con un get, solo con post. Get pintaba la página y post hacía la acción.

// POST request for creating Book.
router.post('/book/create', bookController.createBook);

// GET request to delete Book.
//router.get('/book/:id/delete', bookController.book_delete_get);

// POST request to delete Book.
//router.post('/book/:id/delete', bookController.book_delete_post);

// DELETE request to delete Book.
router.delete('/book/:id/delete', bookController.deleteBook);

// GET request to update Book.
//router.get('/book/:id/update', bookController.book_update_get);

// POST request to update Book.
//router.post('/book/:id/update', bookController.book_update_post);

// PUT request to update Book.
router.put('/book/:id/update', bookController.updateBook);

// GET request for one Book.
router.get('/book/:id', bookController.bookDetail);

// GET request for list of all Book items.
router.get('/books', bookController.bookList);

/// AUTHOR ROUTES ///

// POST request for creating Author. NOTE This must come before route for id (i.e. display author).
router.post('/author/create', authorController.createAuthor);

// DELETE request to delete Author.
router.delete('/author/:id/delete', authorController.deleteAuthor);

// POST request to update Author.
router.put('/author/:id/update', authorController.updateAuthor);

// GET request for one Author.
router.get('/author/:id', authorController.authorDetail);

// GET request for list of all Authors.
router.get('/authors', authorController.authorList);

/// GENRE ROUTES ///

// POST request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.post('/genre/create', genreController.createGenre);

// DELETE request to delete Genre.
router.delete('/genre/:id/delete', genreController.deleteGenre);

// PUT request to update Genre.
router.put('/genre/:id/update', genreController.updateGenre);

// GET request for one Genre.
router.get('/genre/:id', genreController.genreDetail);

// GET request for list of all Genre.
router.get('/genres', genreController.genreList);

/// BOOKINSTANCE ROUTES ///

// POST request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.post('/bookinstance/create', bookInstanceController.createBookInstance);


// GET request to delete BookInstance.
router.delete('/bookinstance/:id/delete', bookInstanceController.deleteBookInstance);

// GET request to update BookInstance.
router.put('/bookinstance/:id/update', bookInstanceController.updateBookInstance);

// GET request for one BookInstance.
router.get('/bookinstance/:id', bookInstanceController.bookinstanceDetail);

// GET request for list of all BookInstance.
router.get('/bookinstances', bookInstanceController.bookinstanceList);

module.exports = router;
