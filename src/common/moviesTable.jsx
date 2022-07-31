import React,{Component} from 'react';
import Like from "../common/like";
import Table from './table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

class MoviesTable extends Component {
    state = {} 

    //  its not going to change throghout the lifecycle of the component
  columns = [
    { path: 'title', label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: 'genre.name', label: "Genre" },
    { path: 'numberInStock', label: "Stock" },
    { path: 'dailyRentalRate', label: "Rate" },
    {
      key: 'like',
      content: movie => (<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />)
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: movie =>
    (<button
      onClick={() => this.props.onDelete(movie)}
      className="btn btn-danger btn-sm">Delete</button>)
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    // Only the admin can delete movies
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
    
    render() { 
        const { movies, onSort, sortColumn} = this.props;
      return (
        <Table
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
          data={movies} />
      );
    }
}
export default MoviesTable;