import React, {useState, useEffect} from "react";
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

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  useEffect(() => {
    fetchData();
  });
  
  const fetchData = async () => {
    const { data } = await getGenres();
    const takenGenres = [{ _id: "", name: 'All Genre' }, ...data]
    const { data: takenMovies } = await getMovies();
    // change the state due to re-rendering
    setMovies(takenMovies);
    setGenres(takenGenres);
  }

  const handleDelete = async movie => {
    const originalMovies = movies;
    // filter: get all the movies except the parameter "movie"
    // m is the iteration argument in the movies array
    const updatedMovies = originalMovies.filter(m => m._id !== movie._id);
    setMovies(updatedMovies);

    try {
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.')
      
      setMovies(originalMovies);
    }

  };

  const handleLike = movie => {
    const movies2 = [...movies];
    const index = movies2.indexOf(movie)
    // movies2[index] = { ...movie[index] };
    movies2[index].liked = !movies2[index].liked;
    setMovies(movies2);
  };

  const handlePageChanged = page => {
    setCurrentPage(page);
  };

  const handleGenreSelect = genre => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  }

  const handleSort = sortedColumn => {
    setSortColumn(sortedColumn);
  }

  const handleSearch = query => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  }

  const { length: count } = movies;
  const allMovies = [...movies];

  if (count === 0) return <p>There are no movies in the database.</p>;

  // && selectedGenre._id => 'All Genre' does not have an id so it will not be included in this filtering and allMovies will be returned
  let filtered = allMovies;
  if (searchQuery)
    filtered = allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
  else if (selectedGenre && selectedGenre._id)
    filtered = allMovies.filter(m => m.genre._id === selectedGenre._id) ;
  
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  const moviesToPaginate = paginate(sorted,currentPage,pageSize);

  return (
      <div className="row">
        <div className="col-2">
          <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect} />
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
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={moviesToPaginate}
          sortColumn = {sortColumn}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPagechanged={handlePageChanged}
          currentPage = {currentPage}
        />
        </div>
    </div>
  );
}

export default Movies;
