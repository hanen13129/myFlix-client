import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button, Card, Col, Container, Row } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies } = this.props;

    const birthDateString = director.Birth;
    const cleanBirthDate = new Date(birthDateString);

    return (
      <Container>
        <Row className="director-view justify-content-md-center">
          <Col md={12} className="director-name">
            <h1 className="value">{director.Name}</h1>
            <span className="director-birth">
              Born: {cleanBirthDate.getFullYear()}, {director.Birth}
            </span>
            <p></p>
            <span className="director-bio">{director.Bio}</span>
            <div className="director-movies">
              <h2 className="director-title mt-3">{director.Name} Movies</h2>
              <Row>
                {movies.map((m) => {
                  if (m.Director && m.Director.Name === director.Name) {
                    return (
                      <Col sm={12} md={8} lg={2}>
                        <Link to={`/movies/${m._id}`}>
                          <Card key={m._id} className="movie-card mt-2 mb-2 ">
                            <Card.Img className="movie-img" src={m.ImagePath} />
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
          </Col>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,

  }),
  onBackClick: PropTypes.func.isRequired,
};