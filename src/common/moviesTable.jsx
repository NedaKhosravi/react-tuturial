import React from 'react';
import Like from "../common/like";
import Table from './table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

const MoviesTable = ({ movies, onSort, sortColumn, onLike, onDelete}) => { 

  //  its not going to change throghout the lifecycle of the component
  const columns = [
    { path: 'title', label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: 'genre.name', label: "Genre" },
    { path: 'numberInStock', label: "Stock" },
    { path: 'dailyRentalRate', label: "Rate" },
    {
      key: 'like',
      content: movie => (<Like liked={movie.liked} onClick={() => onLike(movie)} />)
    }
  ];
  
  const deleteColumn = {
    key: 'delete',
    content: movie =>
    (<button
      onClick={() => onDelete(movie)}
      className="btn btn-danger btn-sm">Delete</button>)
  };

  const user = auth.getCurrentUser();
  // Only the admin can delete movies
  if (user && user.isAdmin) {
    columns.push(deleteColumn);
  }

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={movies} />
  );
}
export default MoviesTable;