const Genre = require('../models/genre');
const Book = require('../models/book');
const Author = require('../models/author');
const BookInstance = require('../models/bookinstance');

// Display list of all Genre.
exports.genreList = (req, res, next) => {
  Genre.find()
  .sort([['name', 'ascending']])
  .exec((err, list_genres) => {
    if (err) { return next(err); }
    res.status(200).send({genre_list: list_genres});;
  });
};
// Display detail page for a specific Genre.
exports.genreDetail = (req, res, next) => {

  let id = req.params.id;

  return Promise.all([
    Genre.findOne({_id: id}),
    Book.find({genre: id}),

  ]).then((results) => {
    let genre = results[0];
    let books = results[1];

    if (!genre) {
      return res.status(404).send('Genre not found')
    }

    return res.status(200).send({
      genre, //genre: genre
      genre_books: books
    })

  }).catch((err) => {
    return next(err);
  });
};

// Display Genre create form on GET.
exports.createGenre = (req, res, next) => {

    let data = req.body;

    let genre = new Genre(data);

    genre.save((err, savedGenre) => {
      if (err) {
        next(err);
      }
       return res.status(200).send(savedGenre);
    });
};

// Display Genre delete form on GET.
exports.deleteGenre = (req, res, next) => {

    let id = req.params.id;

    return Promise.all([
      Genre.findOne({_id: id}),
      Book.find({genre: id}),

    ]).then((results) => {
      let genre = results[0];
      let books = results[1];

      if (!genre) {
        return res.status(404).send('Genre not found')
      }

      if (books.length !== 0) {
        return res.status(400).send('Unable to delete genre because it has books')
      }

      return Genre.findByIdAndRemove(id)
      .then(() => {
        return res.status(200).send(id)
      })

    }).catch((err) => {
      return next(err);
    });
};

// Display Genre update form on GET.
exports.updateGenre = (req, res, next) => {

    let id = req.params.id;
    let data = req.body;
    data._id = id;

    let genre = new Genre(data);

    Genre.findByIdAndUpdate(id, genre, { new: true })
    .then((updatedGenre) => {
      if (!updatedGenre) {
        return res.status(404).send('Genre not found. Unable to update.');
      }
      return res.status(200).send(updatedGenre);
    })
    .catch((err) => {
      return next(err);
    });
};
