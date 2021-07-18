import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import Rating from '../rating/rating';
import {logoClassName} from '../../const';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
function AddReviewScreen(props) {
  const {pickedId} = props;

  const [state, setState] = useState({
    filmId: '',
    userId: '',
    userName: '',
    reviewText: 'Review text',
    rating: 0,
    dateReview: '',
  });

  function handleTextareaChange(event) {
    setState({
      ...state,
      reviewText: event.target.value,
    });
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo logoClassName={logoClassName.HEADER_LOGO} />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`/films/${pickedId}`}>The Grand Budapest Hotel</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`/films/${pickedId}/review`}>Add review</Link>
              </li>
            </ul>
          </nav>
          <UserBlock />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <Rating  state={state} setState={setState}/>
          </div>
          <div className="add-review__text">
            <textarea className="add-review__textarea" name="reviewText" id="review-text" placeholder="Review text" defaultValue={''}
              onChange={(event) => handleTextareaChange(event)}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

AddReviewScreen.propTypes = {
  pickedId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  pickedId: state.pickedId,
  authorizationStatus: state.authorizationStatus,
});

export default connect(mapStateToProps)(AddReviewScreen);
