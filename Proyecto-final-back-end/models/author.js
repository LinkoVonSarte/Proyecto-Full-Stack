const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema( //Empieza por mayúscula (AuthorSchema) porque es una clase.
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  } , {
    toObject: {virtual: true},
    toJSON: {virtuals: true} //Estas dos líneas sirven para que la fecha formateada (due_back_formatted) se muestre en los datos.
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function() {
  return this.family_name + ', ' + this.first_name;
});

//Los virtual son campos que no existen pero que al recuperar el documento puedes utilizarlo como si existiese devolviendo el resultado de la información. Crearía el campo name que devolvería la suma de "apellidos, nombre".

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function() {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function() {
  return moment(this.date_of_birth).format('L');
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function() {
  return moment(this.date_of_death).format('L');
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
