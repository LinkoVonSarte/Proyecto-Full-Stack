import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import HomePage from '../containers/HomePage';
import GenresPage from '../containers/GenresPage';
import AuthorsPage from '../containers/AuthorsPage';
import BooksPage from '../containers/BooksPage';
import BooksReservePage from '../containers/BooksReservePage';
import BooksLoanPage from '../containers/BooksLoanPage';
import BooksGatherPage from '../containers/BooksGatherPage';
import BooksMaintenancePage from '../containers/BooksMaintenancePage';
import BooksOutOfTimePage from '../containers/BooksOutOfTimePage';

class AppStructure extends Component {

  render() {

    const ClickedLink = ({ label, to, activeOnlyWhenExact }) => (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
          <div className={match ? "active" : ""}>
            {match ? "--> " : ""}
            <Link to={to}>{label}</Link>
          </div>
        )}
      />
    );

    return (
      <Router>
        <div className="row" id="container">
          <div className="col-sm-2" id="sidebar">
            <ul className="menuList noUl">
              <li className="mainList noUl"><Link to="/"> Mi Biblioteca</Link></li>
              <ul>
                <li className="secondaryListOption noUl"><ClickedLink to="/generos" label="Géneros"/></li>
                <li className="secondaryListOption noUl"><ClickedLink to="/autores" label="Autores"/></li>
                <li className="secondaryListOption noUl"><ClickedLink to="/libros" label="Libros"/></li>
                <ul>
                  <li className="thirdListOption noUl"><ClickedLink to="/libros/reservar" label="Reservar libro"/></li>
                </ul>
              </ul>
              <li className="mainList noUl"><Link to="/gestion/prestar">Gestión de la Biblioteca</Link></li>
              <ul>
                <li className="secondaryListOption noUl"><ClickedLink to="/gestion/prestar" label="Prestar" libro/></li>
                <li className="secondaryListOption noUl"><ClickedLink to="/gestion/recoger" label="Recoger" libro/></li>
                <li className="secondaryListOption noUl"><ClickedLink to="/gestion/mantenimiento" label="Libros en mantenimiento"/></li>
                <li className="secondaryListOption noUl"><ClickedLink to="/gestion/fuera-plazo" label="Libros fuera de plazo"/></li>
              </ul>
            </ul>
          </div>
          <div className="col-sm-10" id="page">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/generos" component={GenresPage} />
              <Route path="/autores" component={AuthorsPage} />
              <Route exact path="/libros" component={BooksPage} />
              <Route path="/libros/reservar" component={BooksReservePage} />
              <Route path="/gestion/prestar" component={BooksLoanPage} />
              <Route path="/gestion/recoger" component={BooksGatherPage} />
              <Route path="/gestion/mantenimiento" component={BooksMaintenancePage} />
              <Route path="/gestion/fuera-plazo" component={BooksOutOfTimePage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}



export default AppStructure;
