var express = require('express');
var router = express.Router();
var Books = require('../models').Books;

//Handler function to wrap try, catch methods
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

/* GET home route listing. */
router.get('/', asyncHandler(async (req, res, next) => {
  const books = await Books.findAll();
  res.render('index', { books });
}));

//New book GET route
router.get('/new_book', (req, res) => {
  res.render('new_book');
});

//POST route to handle creation of new book
router.post('/new_book', asyncHandler(async (req, res) => {
  try {
    await Books.create(req.body);
    res.redirect('/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Books.build();
      res.render('new_book', { book, errors: error.errors })
    } else {
      throw error;
    }
  }
}));
//get single book by id
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id)
  if (book) {
    res.render('update_book', { book })
  } else {
    res.render('page_not_found')
  }
}));

//POST /books/:id - Updates book info in the database.
router.post('/:id', asyncHandler(async (req, res) => {
  try {
    const book = await Books.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect('/');
    } else {
      res.render('page_not_found')
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Books.findByPk(req.params.id);
      res.render('update_book', { book, errors: error.errors })
    } else {
      throw error;
    }
  }
}));
//Post route to delete book
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Books.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect('/');
  }
  res.render('page_not_found')
}));

//router to catch 404s
router.get('*', (req, res) => {
  res.render('page_not_found')
});


module.exports = router;
