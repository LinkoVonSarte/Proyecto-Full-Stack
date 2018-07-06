const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');
const async = require('async');

exports.index = (req, res, next) => {

  return Promise.all([
      Book.count({}),
      BookInstance.count({}),
      BookInstance.count({status:'Available'}),
      Author.count({}),
      Genre.count({})
  ]).then((results) => {
      return res.status(200).send({
        book_count: results[0],
        book_instance_count: results[1],
        book_instance_available_count: results[2],
        author_count: results[3],
        genre_count: results[4]
      });
  }).catch((err) => {
    return next(err);
  });
};
      /*async.parallel({
        book_count: function(callback) {
            Book.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function(callback) {
            BookInstance.count({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.count({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.count({}, callback);
        },
        genre_count: function(callback) {
            Genre.count({}, callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
  });
};*/

// Display list of all books.
exports.bookList = (req, res, next) => {
  Book.find({}, 'title author isbn genre')
  .populate('author')
  .populate('genre')
  .sort([['title', 'ascending']])
  .exec((err, list_books) => {
    if (err) { return next(err); }

    res.status(200).send({book_list: list_books});
    //Successful, so render
    //res.render('book_list', { title: 'Book List', book_list: list_books });    Este texto se cambia por el de arriba porque render tiene que ver con pintar en html, views, no representar datos.
  });
};

// Display detail page for a specific book.
exports.bookDetail = (req, res, next) => {

    let id = req.params.id;

    return Promise.all([
      Book.findOne({_id: id})
      .populate('author')
      .populate('genre')
      .exec(),
      BookInstance.find({book: id}),

    ]).then((results) => {
      let book = results[0];
      let instances = results[1];

      if (!book) {
        return res.status(404).send('Book not found')
      }

      return res.status(200).send({
        book, //book: book
        book_instances: instances
      })

    }).catch((err) => {
      return next(err);
    });
  }

// Display book create form on GET.
/*exports.createBook = (req, res) => {
    res.send('NOT IMPLEMENTED: Book create GET');
};*/

// Handle book create on POST.
exports.createBook = (req, res, next) => {

  let data = req.body;

  let book = new Book(data);

  book.save((err, savedBook) => {
    if (err) {
      next(err);
    }
     return res.status(200).send(savedBook);
  });
}
//en postman cuando se usan arrays, como en el caso de genre se ha de poner en key genre.0 (el número es la posición en el array) o escribir directamente un json en la opción raw.
// Display book delete form on GET.
/*exports.deleteBook = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
};*/

// Handle book delete on POST.
/*exports.deleteBook = (req, res) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
};*/

// Display book delete form on DELETE.
exports.deleteBook = (req, res, next) => {

  let id = req.params.id;

  return Promise.all([
    Book.findOne({_id: id})
    .populate('author')
    .populate('genre')
    .exec(),
    BookInstance.find({book: id}),

  ]).then((results) => {
    let book = results[0];
    let instances = results[1];

    if (!book) {
      return res.status(404).send('Book not found')
    }

    if (instances.length !== 0) {
      return res.status(400).send('Unable to delete book because it has instances')
    }

    return Book.findByIdAndRemove(id)
    .then(() => {
      return res.status(200).send('Book deleted')
    })
  }).catch((err) => {
    return next(err);
  });
}

// Display book update form on GET.
/*exports.updateBook = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Book update POST');
};*/

// Display book update form on PUT.
exports.updateBook = (req, res, next) => {

  let id = req.params.id;
  let data = req.body;

  Book.findOne({_id: id}).then((book) => {
    let bookObject = book.toJSON();
    Object.assign(bookObject, data, {_id: id});



  return Book.findByIdAndUpdate(id, bookObject, { new: true });
}).then((updatedBook) => {
    if (!updatedBook) {
      return res.status(404).send('Book not found. Unable to update.');
    }
    return res.status(200).send(updatedBook);
  })
  .catch((err) => {
    return next(err);
  });
}
