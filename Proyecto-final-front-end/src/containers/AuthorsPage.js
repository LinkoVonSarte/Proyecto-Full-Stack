import React, { Component } from 'react';
import { getAuthors, createAuthor } from '../actions'
import { connect } from 'react-redux';

class AuthorsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newAuthorName: '',
      newAuthorFamilyName: '',
      newAuthorDateOfBirth: '',
      newAuthorDateOfDeath: '',
      isEdit: false
    };

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleFamilyNameInput = this.handleFamilyNameInput.bind(this);
    this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
    this.handleDateOfDeath = this.handleDateOfDeath.bind(this);
    this.handleCreateAuthor = this.handleCreateAuthor.bind(this);
  }

  componentWillMount() {
    this.props.getAuthors();
  }

  handleNameInput(elem) {
    this.setState({
      newAuthorName: elem.target.value
    });
  }

  handleFamilyNameInput(elem) {
    this.setState({
      newAuthorFamilyName: elem.target.value
    });
  }

  handleDateOfBirth(elem) {
    this.setState({
      newAuthorDateOfBirth: elem.target.value
    });
  }

  handleDateOfDeath(elem) {
    this.setState({
      newAuthorDateOfDeath: elem.target.value
    });
  }

  handleCreateAuthor() {
    this.props.createAuthor(this.state.newAuthorName);
    this.props.createAuthor(this.state.newAuthorFamilyName);
    this.props.createAuthor(this.state.newAuthorDateOfBirth);
    this.props.createAuthor(this.state.newAuthorDateOfDeath);
  }

  render() {

    const { authors } = this.props

    const authorData = authors.map((content) => {
      const edit = <button className="button edit" type="submit" onClick={this.handleButtonName}>Editar</button>
      const erase = <button className="button erase" type="submit">Eliminar</button>
      /*let items = [];
      for (var i in content) {
        items.push(<td>{content[i]}</td>);
      }*/
      console.log('Aquí content');
      console.log(content);
      return <tr key={content._id}>
              <td>{content.first_name}</td>
              <td>{content.family_name}</td>
              <td>{content.date_of_birth_formatted}</td>
              <td>{content.date_of_death_formatted}</td>
              <td>{edit}{erase}</td>
            </tr>
    });

    return (
      <div>
        <div>
          <span><a href="/">Mi biblioteca</a> > <a href="/autores">Autores</a></span>
          <div className="authContainer">
            <span className="inputName">Nombre: </span>
            <input className="input"
                   type="text"
                   id="author_name"
                   name="author"
                   size="40"
                   placeholder="Escriba el nombre del autor"
                   value={this.state.newAuthorName}
                   onChange={this.handleNameInput} />
            <span className="inputName">Apellidos: </span>
            <input className="input"
                   type="text"
                   id="author_name"
                   name="author"
                   size="40"
                   placeholder="Escriba los apellidos del autor"
                   value={this.state.newAuthorFamilyName}
                   onChange={this.handleFamilyNameInput}/>
          </div>
          <div>
            <span className="inputName">Fecha de nacimiento: </span>
            <input className="input"
                   type="text"
                   id="author_name"
                   name="author"
                   size="40"
                   placeholder="Escriba la fecha de nacimiento del autor"
                   value={this.state.newAuthorDateOfBirth}
                   onChange={this.handleDateOfBirth} />
            <span className="inputName">Fecha de defunción: </span>
            <input className="input"
                   type="text"
                   id="author_name"
                   name="author"
                   size="40"
                   placeholder="Escriba la fecha de defunción del autor"
                   value={this.state.newAuthorDateOfDeath}
                   onChange={this.handleDateOfDeath}/>
            <button className="btn btn-success"
                    type="button"
                    onClick={this.handleCreateAuthor}>Crear</button>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-11">
            <table id="table" className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Fecha de nacimiento</th>
                    <th>Fecha de defunción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                 <tbody>
                   {authorData}
                 </tbody>
               </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => ({
  getAuthors:() => dispatch(getAuthors()),
  createAuthor:(first_name, family_name, date_of_birth, date_of_death) => dispatch(createAuthor(first_name, family_name, date_of_birth, date_of_death))
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
