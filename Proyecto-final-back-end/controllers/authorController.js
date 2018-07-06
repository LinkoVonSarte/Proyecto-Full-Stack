const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

// Display list of all Authors.
exports.authorList = (req, res, next) => {
  Author.find()
  .sort([['family_name', 'ascending']])
  .exec(function (err, list_authors) {
    if (err) { return next(err); }
    res.status(200).send({author_list: list_authors});
  //Successful, so render
  //res.render('author_list', { title: 'Author List', author_list: list_authors });
  });
};

// Display detail page for a specific Author.
exports.authorDetail = function(req, res, next) {

  let id = req.params.id;

  return Promise.all([
    Author.findOne({_id: id}),
    Book.find({author: id}),

  ]).then((results) => {
    let author = results[0];
    let books = results[1];

    if (!author) {
      return res.status(404).send('Author not found')
    }

    return res.status(200).send({
      author, //author: author
      author_books: books
    })

  }).catch((err) => {
    return next(err);
  });
}

/*    async.parallel({
        author: (callback) => {
          Author.findById(req.params.id)
          .exec(callback)
        },
        authors_books: (callback) => {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            const err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.status(200).send('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });

};*/

// Display Author create form on GET.
exports.createAuthor = (req, res, next) => {

  let data = req.body;

  let author = new Author(data);

  author.save((err, savedAuthor) => {
    if (err) {
      next(err);
    }
     return res.status(200).send(savedAuthor);
  })
};


// Display Author delete form on GET.
exports.deleteAuthor = (req, res, next) => {
  let id = req.params.id;

  return Promise.all([
    Author.findOne({_id: id}),
    Book.find({author: id}),

  ]).then((results) => {
    let author = results[0];
    let books = results[1];

    if (!author) {
      return res.status(404).send('Author not found')
    }

    if (books.length !== 0) {
      return res.status(400).send('Unable to delete author because it has books')
    }

    return Author.findByIdAndRemove(id)
    .then(() => {
      return res.status(200).send('Author deleted')
    })
  }).catch((err) => {
    return next(err);
  });
}

// Display Author update form on GET.
exports.updateAuthor = (req, res) => {

  let id = req.params.id;
  let data = req.body;
  data._id = id;

  let author = new Author(data);

  Author.findByIdAndUpdate(id, author, { new: true })
  .then((updatedAuthor) => {
    if (!updatedAuthor) {
      return res.status(404).send('Author not found. Unable to update.');
    }
    return res.status(200).send(updatedAuthor);
  })
  .catch((err) => {
    return next(err);
  });
};
