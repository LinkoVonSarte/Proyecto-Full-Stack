import React, { Component } from 'react';
import { getGenres, createGenre, deleteGenre, updateGenre } from '../actions'
import { connect } from 'react-redux';


class GenresPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newGenreName: '',
      genreId: '',
      isEdit: false,
    };

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleCreateGenre = this.handleCreateGenre.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleGenreCopy = this.handleGenreCopy.bind(this);
    }

  componentWillMount() {
    this.props.getGenres();
  }

  handleNameInput(elem) {
    this.setState({
      newGenreName: elem.target.value
    });
  }

  handleCreateGenre() {
    this.setState({
      newGenreName:""
    });
    this.props.createGenre(this.state.newGenreName);
  }

  handleEdit(genreId) {
    this.setState({
      isEdit: !this.state.isEdit,
      newGenreName: ''
    });
    this.props.updateGenre(genreId, this.state.newGenreName)
  }

  handleDelete(id) {
    this.setState({
      isEdit: false,
      newGenreName: "",
    });
    this.props.deleteGenre(id);
  }

  handleGenreCopy(genreId) {
    const newGenreName = this.props.genres.filter((genre) => genre._id === genreId)[0].name;
    this.setState({
      genreId,
      newGenreName,
      isEdit: !this.state.isEdit
    });
  }


  render() {

    const { genres } = this.props

    const CreateButton = this.state.isEdit ? (
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <button className="btn btn-primary"
                type="radio" name="options" id="option1"
                onClick={this.handleEdit.bind(this, this.state.genreId)}>Editar</button>
        <button className="btn btn-danger"
                type="radio" name="options" id="option2"
                onClick={this.handleEdit}>Cancel</button>
      </div>
     ):(<button className="btn btn-success"
               type="button"
               onClick={this.handleCreateGenre}>Crear</button>
     );

    const genreData = genres.map((content) => {
      const edit = <button className="button edit"
                           type="button"
                           onClick={this.handleGenreCopy.bind(this, content._id)}>
                           Editar
                   </button>
      const erase = <button className="button erase"
                            type="button"
                            onClick={this.handleDelete.bind(this, content._id)}>
                            Eliminar
                    </button>
      console.log('Aquí content');
      console.log(content);
      return  <tr key={content._id}>
                <td>{content.name}</td>
                <td>{edit}{erase}</td>
              </tr>
    });

    return (
      <div>
        <span><a href="/">Mi biblioteca</a> > <a href="/generos">Géneros</a></span>
        <div className="genresContainer">
          <label htmlFor="genre_name" className="inputName">Nombre: </label>
          <input className="input"
                  type="text"
                  id="genre_name"
                  name="genre"
                  size="40"
                  placeholder="Escriba el nombre del nuevo género"
                  value={this.state.newGenreName}
                  onChange={this.handleNameInput} />
          {CreateButton}
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-6">
            <table id="table" className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
               <tbody>
                 {genreData}
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
    genres: state.genres,
  };
};

const mapDispatchToProps = dispatch => ({
  getGenres:(genres) => dispatch(getGenres(genres)),
  createGenre:(name) => dispatch(createGenre(name)),
  deleteGenre:(id) => dispatch(deleteGenre(id)),
  updateGenre:(id, name) => dispatch(updateGenre(id, name)),
});


export default connect(mapStateToProps, mapDispatchToProps)(GenresPage);
