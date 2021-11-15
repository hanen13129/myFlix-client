import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: " The Notebook ", Description: " A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. ", Imagepath: " https://upload.wikimedia.org/wikipedia/en/8/86/Posternotebook.jpg " },
                { _id: 2, Title: " Titanic ", Description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", Imagepath: "https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png" },
                { _id: 3, Title: "Jurassic Park", "Description": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.", Imagepath: "https://images-na.ssl-images-amazon.com/images/I/8142L+TQEyL.jpg" }
            ],
            // selectedMovie: null
        };
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                        this.setSelectedMovie(newSelectedMovie);
                    }} />
                    : movies.map(
                        movie => (
                            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {
                                this.setSelectedMovie(movie)
                            }} />
                        ))
                }
            </div>
        );
    }
}





