import React, { Component } from 'react';
import { getBooks, getGenres, getAuthors } from '../actions'
import { connect } from 'react-redux';

class BooksPage extends Component {

  componentWillMount() {
    this.props.getBooks();
    this.props.getGenres();
    this.props.getAuthors();
  }

  render() {

    const { books, genres, authors } = this.props;

    const bookData = books.map((content) => {
      const edit = <button className="button edit" type="submit" onClick={this.handleButtonName}>Editar</button>
      const erase = <button className="button erase" type="submit">Eliminar</button>
      /*let items = [];
      for (var i in content) {
        items.push(<td>{content[i]}</td>);
      }*/
      console.log('Aquí content');
      console.log(content);
      return <tr key={content._id}>
                <td>{content.title}</td>
                <td>{content.isbn}</td>
                <td>{content.genre.map((genre) => {
                  return (<p key={genre._id}>{genre.name}</p>)
                })}</td>
                <td>{content.author.name}</td>
                <td>{edit}{erase}</td>
              </tr>
    });


    return (
      <div>
        <span><a href="/">Mi biblioteca</a> > <a href="/libros">Libros</a></span>
        <div>
          <span className="inputName">Título: </span>
          <input className="input" type="text" id="bookTitle" name="bookTitle" size="40" placeholder="Escriba el título del libro" />
          <span className="inputName">ISBN: </span>
          <input className="input" type="text" id="bookISBN" name="bookISBN" size="40" placeholder="Escriba el ISBN del libro" />
        </div>
        <div>
          <span className="inputName">Género: </span>
          <select>{genres.map((genre)=> {console.log(genre); return(<option key={genre._id}>{genre.name}</option>)})}</select>
          <span className="inputName">Autor: </span>
          <select>{authors.map((author)=> {console.log('aquí authors.map'); console.log(author); return(<option key={author._id}>{author.name}</option>)})}</select>
        </div>
        <div>
          <span className="inputName">Descripción: </span>
          <textarea type="submit" placeholder="Escribe la descripción del libro aquí." rows="5" cols="100"></textarea>
        </div>
        <div>
          <button className="button create success" type="submit"><span>Crear</span></button>
        </div>
        <div className="row">
          <div className="col-sm-11">
          <table id="table" className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
                <tr>
                  <th>Título</th>
                  <th>ISBN</th>
                  <th>Género</th>
                  <th>Autor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {bookData}
              </tbody>
             </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    genres: state.genres,
    authors: state.authors,
  };
};

const mapDispatchToProps = dispatch => ({
  getBooks:() => dispatch(getBooks()),
  getGenres:() => dispatch(getGenres()),
  getAuthors:() => dispatch(getAuthors()),
});


export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
