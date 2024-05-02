import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import './Gallery.scss'
const api_key = import.meta.env.VITE_API_KEY

const genres = [
	{ id: 0, name: 'All' },
	{ id: 28, name: 'Action' },
	{ id: 12, name: 'Adventure' },
	{ id: 16, name: 'Animation' },
	{ id: 35, name: 'Comedy' },
	{ id: 80, name: 'Crime' },
	{ id: 99, name: 'Documentary' },
	{ id: 18, name: 'Drama' },
	{ id: 10751, name: 'Family' },
	{ id: 14, name: 'Fantasy' },
	{ id: 36, name: 'History' },
	{ id: 27, name: 'Horror' },
	{ id: 10402, name: 'Music' },
	{ id: 9648, name: 'Mystery' },
	{ id: 10749, name: 'Romance' },
	{ id: 878, name: 'Science Fiction' },
	{ id: 10770, name: 'TV Movie' },
	{ id: 53, name: 'Thriller' },
	{ id: 10752, name: 'War' },
	{ id: 37, name: 'Western'}
];

export default function Gallery() {
	const [movies, setMovies] = useState<any>([]);
	const [genre, setGenre] = useState(0);

	useEffect(() => {discoverMovies()}, [genre])

	function discoverMovies() {
		axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`, {
			params: {
				sort_by: 'popularity.desc',
				page: 1,
				with_genres: (genre == 0) ? '' : genre
			}
		})
		.then((response) => {
			let new_movies = response['data']['results'];
			setMovies(new_movies);
			console.log(new_movies);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	function renderMovieGalleryItems() {
		let retVal = [];

		for (let i = 0; i < movies.length; i+=1) {
			retVal.push(
				<Grid item xs={1}>
					<Link className='movieColumn'
						key={movies[i].id}
						to='/movies-galore/details'
						state={{
							movies: movies,
							current_movie: movies[i].id
						}}
					>
						<img src={'https://image.tmdb.org/t/p/w92' + movies[i].poster_path} alt='No image available'/>
						<h2>{movies[i].title}</h2>
					</Link>
				</Grid>
			)
		}

		return retVal;
	}

	function renderButtons(buttonGenre: any) {
		return (
			<div className='button'>
				<Button variant='contained' onClick={(e) => handleButtonClick(e, buttonGenre.id)} color={genre == buttonGenre.id ? 'secondary' : 'primary'}>{buttonGenre.name}</Button>
			</div>
		)
	}

	function handleButtonClick(_e: React.MouseEvent<HTMLElement>, genreId: number) {
		setGenre(genreId);
	}

	return (
		<div>
			{genres.map(g => renderButtons(g))}

			<Grid container spacing={2} columns={5}>
				{renderMovieGalleryItems()}
			</Grid>
		</div>
	)
}
