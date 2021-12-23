import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  
  render() {
    const { director, onBackClick, movies } = this.props;

    const directorsMovies = movies.filter(m => m.Director.Name === director.Name);
    
    return (
      <Container className="director-container m-4">
        <Row  className="text-white">
         <h1>{director.Name}</h1>
         </Row>
         <Row className="text-white">
          <p className="director-description">Born: {director.Birthyear}</p>
          <p>Biography: {director.Bio} </p>
         </Row>
         <Row>
           <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to list</Button>
         </Row>
         <Row className="text-white mt-5">
           <h2>Related Movies</h2>
         </Row>
         <Row className="text-white">
           {directorsMovies.map((m, i) => <Link to={`/movies/${m.Title}`} className="directors-movies" key={i}>{m.Title}</Link>)}
         </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};