import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import Pagination from "../pagination";
import MoviesTable from './../../common/moviesTable';
import ListGroup from './../listGroup';
import SearchBox from './../searchBox';
import { paginate } from "../../utils/paginate";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from "lodash"

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: {path: 'title', order:'asc'}
  };

  // This method will be called when an instance of this component is renderd in the DOM
  // Lifecycle hook
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: 'All Genre' }, ...data]
    const { data: movies } = await getMovies();
    // change the state due to re-rendering
    this.setState({ movies, genres});
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    // filter: get all the movies except the parameter "movie"
    // m is the iteration argument in the movies array
    const movies = originalMovies.filter(m => m._id !== movie._id);
    // Update the movies array
    // movies : movies => key and value are the same so we simplify it
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.')
      
      this.setState({ movies: originalMovies });
    }

  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie)
    // movies[index] = { ...movie[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChanged = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery:"", currentPage: 1});
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  }

  handleSearch = query => {
    this.setState({searchQuery: query, selectedGenre: null, currentPage:1});
  }


  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, selectedGenre, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database.</p>;

    // && selectedGenre._id => 'All Genre' does not have an id so it will not be included in this filtering and allMovies will be returned
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id) ;
    
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviesToPaginate = paginate(sorted, this.state.currentPage, this.state.pageSize);

    return (
        <div className="row">
          <div className="col-2">
            <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect} />
         </div>
        <div className="col">
          {user && 
            <Link
              to={"/movies/new"}
              className={"btn btn-primary"}
              style={{ marginBottom: 20 }}>
              New Movie
            </Link>
          }
          <p>Showing {filtered.length} movies in the database.</p>
          <SearchBox value={ searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={moviesToPaginate}
            sortColumn = {sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPagechanged={this.handlePageChanged}
            currentPage = {this.state.currentPage}
          />
         </div>
      </div>
    );
  }
}

export default Movies;
