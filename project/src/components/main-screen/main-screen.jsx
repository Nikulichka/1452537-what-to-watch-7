import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../logo/logo';
import Copyright from '../copyright/copyright';
import UserBlock from '../user-block/user-block';
import GenreList from '../genre-list/genre-list';
import MoviesList from '../movies-list/movies-list';
import FIlmCardButtons from '../film-card-buttons/film-card-buttons';
import {logoClassName} from '../../const';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

function MainScreen(props) {
  const {promoFilm, movies, genre, onFilterClick} = props;
  const location = useLocation();

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo logoClassName={logoClassName.HEADER_LOGO} />
          <UserBlock />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>
              <FIlmCardButtons  location={location.pathname}/>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList movies={movies} onFilterClick={onFilterClick} />
          <MoviesList movies={movies} genre={genre} />
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        <footer className="page-footer">
          <Logo logoClassName={logoClassName.FOOTER_LOGO} />
          <Copyright />
        </footer>
      </div>
    </React.Fragment>
  );
}

MainScreen.propTypes = {
  promoFilm: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterClick(genre, movies) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getListMovies(genre, movies));
  },
});

export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
