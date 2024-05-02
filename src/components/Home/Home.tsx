import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField';

import './Home.scss'
const api_key = import.meta.env.VITE_API_KEY

const options = [
	{ text: 'Popularity', value: 'popularity' },
	{ text: 'Title', value: 'title' }
]
const options_direction = [
	{ text: 'Ascending', value: 'ascend' },
	{ text: 'Descending', value: 'descend' }
]

let option = 'popularity';
let direction = 'ascend';

export default function Home() {
	const [movies, setMovies] = useState([])

	function handleQuery(text: string) {
		if (text == '') { // clears the list if nothing is in the search box
			setMovies([]);
			return;
		}

		axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}`, {
			params: {
				query: text//,
				// page: 1
			}
		})
		.then((response) => {
			let new_movies = response['data']['results'];
			handleMovieListUpdate(new_movies);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	// sorts the movies by the selected choices from the dropdown menus
	function handleMovieListUpdate(new_movies=[...movies]) {
		let sortedMovies = new_movies;
		switch(option) {
			case 'popularity':
				sortedMovies.sort(function(a: any, b: any) {
					return b.popularity - a.popularity;
				});
				break;
			case 'title':
				sortedMovies.sort(function(a: any, b: any) {
					let x = a.title.toLowerCase();
					let y = b.title.toLowerCase();
				if (x < y) {return -1;}
					else if (x > y) {return 1;}
					else {return 0;}
				});
				break;
		}

		if (direction == 'descend') {
			sortedMovies = sortedMovies.reverse();
		}

		setMovies(sortedMovies);
	}

	function renderMovieListRow(movie: any) { // lists the movies returned from the search query in rows
		return (
			<Grid item xs={12}>
				<Link className='movieRow'
					key = {movie.id}
					to = '/movies-galore/details'
					state = {{
						movies: movies,
						current_movie: movie.id
					}}
				>
					<img src={'https://image.tmdb.org/t/p/w92' + movie.poster_path} alt='No image available'/>
					<div className='data'>
						<h2>{movie.title}</h2>
						<h3>Popularity: {movie.popularity.toFixed(2)}</h3>
					</div>
				</Link>
			</Grid>
		);
	}

	return(
		<div className='tab'>
			<div id='searchBar'>
				<div id='searchTextField'>
					<TextField fullWidth label='Search for a movie' onChange={text => handleQuery(text.target.value)} />
				</div>
				
				<TextField select defaultValue='popularity' onChange={(event) => {
						option = event.target.value;
						handleMovieListUpdate();
					}}>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.text}
						</MenuItem>
					))}
				</TextField>
				<TextField select defaultValue='ascend' onChange={(event) => {
						direction = event.target.value;
						handleMovieListUpdate();
					}}>
					{options_direction.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.text}
						</MenuItem>
					))}
				</TextField>
			</div>
			
			<Grid container spacing={2}>
				{movies.map(m => renderMovieListRow(m))}
			</Grid>
		</div>
	);
}