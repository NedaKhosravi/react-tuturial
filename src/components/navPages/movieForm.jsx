import React, { useState, useEffect } from 'react';
import Form2 from '../forms/form';
import Joi  from 'joi-browser';
import { getGenres } from '../../services/genreService';
import { getMovie, saveMovie } from '../../services/movieService';

const MovieForm = (props) => {
    const [genres, setGenres] = useState([]);
    const [data, setData] = useState({
        title: '',
        genreId: '',
        dailyRentalRate: '',
        numberInStock: ''
    });
    const [errors, setErrors] = useState({});
    
    const schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(1000).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Daily Rental Rate')
    };

    const populateGenres = async () => {
        const { data } = await getGenres();
        setGenres(data);
    }

    const populateMovie= async () =>{
        try {
            const movieId = props.match.params.id;
            if (movieId === "new") return;

            const { data: movie } = await getMovie(movieId);
            setData(mapToViewModel(movie));
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                props.history.replace("/not-found");
        }
    }

    const fetchData = async () => {
        await populateGenres();
        await populateMovie();
    }

    useEffect(() => {
        fetchData();
    });

    const mapToViewModel = (movie) =>{
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    const doSubmit = async () => {
        await saveMovie(data);
        props.history.push("/movies");
    }
    return (
        <>
            <h1>Movie Form</h1>
            <form onSubmit={Form2.handleSubmit(doSubmit,schema)}>
                {Form2.renderInput("title", "Title",schema)}
                {Form2.renderSelect("genreId","Genre", genres,schema)}
                {Form2.renderInput("numberInStock","Number in Stock", "number",schema)}
                {Form2.renderInput("dailyRentalRate","Rate",schema)}
                {Form2.renderButton("Save",schema)}
                <button className="btn btn-primary" style={{marginLeft:"15px"}} onClick={() => props.history.push('/movies')}>Back</button>
            </form>
        </>
    );
}
 
export default MovieForm;