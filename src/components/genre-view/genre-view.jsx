import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button, Card, Col, Row } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <div className="genre-view">
        <h1 className="genre-name">{genre.Name}</h1>
        <div className="genre-description">{genre.Description}</div>
        <div className="genre-movies">
          <h2 className="genre-movie-title mt-3">{genre.Name} Movies</h2>
          <Row>
            {movies.map((m) => {
              if (m.Genre && m.Genre.Name === genre.Name) {
                return (
                  <Col sm={12} md={8} lg={2}>
                    <Link to={`/movies/${m._id}`}>
                      <Card key={m._id} className="genre-card mt-2 mb-2 ">
                        <Card.Img className="genre-img" src={m.ImagePath} />
                      </Card>
                    </Link>
                  </Col>
                );
              }
            })}
            <Col md={12}>
              <div className="back-button text-center">
                <Button
                  className=" font-weight-bold"
                  variant="primary"
                  onClick={() => {
                    onBackClick(null);
                  }}
                >
                  Back
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};