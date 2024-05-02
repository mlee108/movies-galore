import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'

import './Details.scss'

export default function Details() {
	const location = useLocation();
	const {movies, current_movie} = location.state;
	const [movieId, setMovieId] = useState(current_movie);

	function handleButtonClick(step: number) {
		console.log(step);
		let idx = movies.map((m: { id: number }) => {return m.id}).indexOf(movieId);
		idx = idx + step;
		if (idx < 0) {
			idx = movies.length-1;
		} else if (idx >= movies.length) {
			idx = 0;
		}
		let new_id = movies[idx].id;
		setMovieId(new_id);
	}

	let movie = movies.find((m: { id: number }) => {return m.id == movieId;});

	return (
		<div className='details'>
			<Button className='button-left' onClick={() => handleButtonClick(-1)}>&#10094;</Button>
			<img src={'https://image.tmdb.org/t/p/w342' + movie['poster_path']} alt='No image available'/>

			<div className='data'>
				<h1>{movie['title']}</h1>
				<h3>Release Date: {movie.release_date}</h3>
				<h3>Language: {movie.original_language}</h3>
				<h3>Popularity: {movie.popularity}</h3>
				<h3>Plot: {movie.overview}</h3>
			</div>
			<Button className='button-right' onClick={() => handleButtonClick(1)}>&#10095;</Button>
		</div>
	);
}