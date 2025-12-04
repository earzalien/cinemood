import "./Catalog.css";
import "./Catalog-mobile.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {
	getGenresMovies,
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
} from "../../api";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import Filters from "../../components/Filters/Filters";
import MovieCard from "../../components/MovieCard/MovieCard";
import { SearchbarContext } from "../../context/SearchBarContext";

function Catalog() {
	const [genre, setGenre] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const { getAllMovies, filteredMovies, setFilteredMovies } =
		useContext(SearchbarContext);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getGenresMovies().then(setGenre);
		getPopularMovies().then(setPopularMovies);
		getTopRatedMovies().then(setTopRatedMovies);
		getNowPlayingMovies().then(setNowPlayingMovies);
		getUpcomingMovies().then(setUpcomingMovies);
	}, []);

	useEffect(() => {
		if (!getAllMovies || getAllMovies.length === 0) return;

		const interval = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * getAllMovies.length);
			setCurrentIndex(randomIndex);
		}, 10000);

		return () => clearInterval(interval);
	}, [getAllMovies]);

	if (!getAllMovies || getAllMovies.length === 0) return <div>Loading...</div>;

	const coverUrl = getAllMovies[currentIndex].backdrop_path
		? `https://image.tmdb.org/t/p/original${getAllMovies[currentIndex].backdrop_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<>
			<div
				className={`movie-cover ${isOpen ? "open" : ""}`}
				style={{ backgroundImage: `url(${coverUrl})` }}
			>
				<div className="cover-overly" />
			</div>
			<Filters
				genreListApi={genre}
				movies={getAllMovies}
				filteredMovies={filteredMovies}
				setFilteredMovies={setFilteredMovies}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>

			{isOpen ? (
				<>
					<div className="modal-catalog primary-background">
						{filteredMovies.length > 0 ? (
							filteredMovies.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))
						) : (
							<h1 className="secondary-title resurch-no-results">
								Aucun résultat n'a été trouvé pour votre recherche.
							</h1>
						)}
					</div>
				</>
			) : (
				<>
					<div className="primary-background">
						<h2 className="movie-categories">Tendances</h2>
						<CarouselMovie movies={popularMovies} />

						<h2 className="movie-categories">Les mieux notés</h2>
						<CarouselMovie movies={topRatedMovies} />

						<h2 className="movie-categories">
							Actuellement à l'affiche au cinéma
						</h2>
						<CarouselMovie movies={nowPlayingMovies} />

						<h2 className="movie-categories">A venir prochainement</h2>
						<CarouselMovie movies={upcomingMovies} />
					</div>
				</>
			)}
		</>
	);
}

export default Catalog;
