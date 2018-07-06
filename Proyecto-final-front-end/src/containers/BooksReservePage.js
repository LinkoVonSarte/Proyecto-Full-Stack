import React, { Component } from 'react';
import { getBooks } from '../actions'
import { connect } from 'react-redux';

class BooksReservePage extends Component {

    componentWillMount() {
      this.props.getBooks();
    }

  render() {

    const { books } = this.props;

    const bookReservationData = books.map((content) => {
      const select = <button className="button edit" type="submit">Seleccionar</button>
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
                <td>{select}</td>
              </tr>
    });


    return (
      <div>
        <span><a href="/">Mi biblioteca</a> > <a href="/libros">Libros</a> > <a href="/libros/reservar">Reservar libro</a></span>
        <p>Libros disponibles actualmente:</p>
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
                 {bookReservationData}
               </tbody>
             </table>
          </div>
        </div>
        <div>
          <p>Libro seleccionado:</p>
          <span>Título: </span>
          <span>Género: </span>
          <span>ISBN: </span>
          <span>Autor: </span>
          <span>Resumen: </span>
          <button className="button create success" type="submit"><span>Reservar</span></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = dispatch => ({
  getBooks:() => dispatch(getBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksReservePage);
