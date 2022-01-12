import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
//Bootstrap Elements
import { Button, Container } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';

import { Row, Button, Col } from 'react-bootstrap';
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(
        `https://movies-api-db.herokuapp.com/users/${user}` +
          "/movies/" +
          this.props.movie._id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
      
        alert(this.props.movie.Title + " has been added to your favorites!");
      });
      
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.ImagePath} crossOrigin="anonymous" />
          </div>
          <div className="movie-title">
            <span className="label"></span>
            <h1 className="value">{movie.Title}</h1>
          </div>
          <div className="movie-genre">
            <span className="label text-uppercase font-weight-bold text-muted">
              Genre{" "}
            </span>
            <Link className="link" to={`/genre/${movie.Genre.Name}`}>
              <span className="value">{movie.Genre.Name}</span>
            </Link>
            <span> | </span>
            <span className="label text-uppercase font-weight-bold text-muted">
              Director{" "}
            </span>
            <Link className="link" to={`/director/${movie.Director.Name}`}>
              <span className="value">{movie.Director.Name}</span>
            </Link>
            <p></p>
          </div>
          <div className="movie-description">
            <span className="label"></span>
            <span className="value">{movie.Description}</span>
          </div>
          <p></p>
          <div className="btn-toolbar">
            <Button
              className="favorite-btn font-weight-bold mr-3"
              variant="primary"
              onClick={() => this.addFavorite(movie)}
            >
              + Add To Favorites
            </Button>
            <Button
              className="back-button font-weight-bold"
              variant="primary"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};