import React, { Component } from 'react';
import { connect } from 'react-redux';
//import InfoContainer from '../components/InfoContainer'
import { getGenres, getBooks, getAuthors } from '../actions'

class HomePage extends Component {

  componentWillMount() {
    this.props.getGenres();
    this.props.getBooks();
    this.props.getAuthors();
  }

  render() {
    const { authors, genres, books } = this.props

    return (
      <div>
        <h1>Mi biblioteca</h1>
        <img
          className="mainImg"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Melk_-_Abbey_-_Library.jpg/1200px-Melk_-_Abbey_-_Library.jpg"
          alt="Main library"
          title="Library"/>
        <hr />
        <div className='infoContainer' >
          <a href="/generos">
            <input className='infoItem info' type="button" value={`${genres.length} ${genres.length !==1 ? " géneros" : " género"}`} />
          </a>
          <a href="/autores">
            <input className='infoItem info' type="button" value={`${authors.length} ${authors.length !== 1 ? " autores" : " autor"}`} />
          </a>
          <a href="/libros">
            <input className='infoItem info' type="button" value={`${books.length} ${books.length !== 1 ? " libros" : " libro"}`} />
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres,
    books: state.books,
    authors: state.authors,
  };
};

const mapDispatchToProps = dispatch => ({
  getGenres:() => dispatch(getGenres()),
  getBooks:() => dispatch(getBooks()),
  getAuthors:() => dispatch(getAuthors()),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
