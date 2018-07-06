const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now},
    author: {type: Schema.ObjectId, ref: 'Author', required: true},
  } , {
    toObject: {virtual: true},
    toJSON: {virtuals: true} //Estas dos líneas sirven para que la fecha formateada (due_back_formatted) se muestre en los datos.
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function() {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema
.virtual('due_back_mmm_do_yyyy')
.get(function() {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

BookInstanceSchema
.virtual('due_back_yyyy_mm_dd')
.get(function () {
 return moment(this.due_back).format('YYYY-MM-DD');
});

BookInstanceSchema
.virtual('due_back_dd_mm_yy')
.get(function () {
 return moment(this.due_back).format('DD-MM-YYYY');
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function() {
  return moment(this.due_back).format('L');
});

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
