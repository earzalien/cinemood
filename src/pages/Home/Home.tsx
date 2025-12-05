import "./Home.css";
import "./Home-mobile.css";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { Link } from "react-router";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import { useLaunch } from "../../context/LaunchQuiz";
import { useContext } from "react";
import { SearchbarContext } from "../../context/SearchBarContext";
import MovieSearchModal from "../../components/MovieSearchModal/MovieSearchModal";

function Home() {
	const [popularMovies, setPopularMovies] = useState([]);
	const { setLaunch } = useLaunch();
	const [genreImages, setGenreImages] = useState<Record<string, string>>({});

	const {
		isOpen,
		setIsOpen,
		searchValue,
		getAllMovies,
		filteredMovies,
		setFilteredMovies,
	} = useContext(SearchbarContext);

	const representativeMovies = [
		{ genre: "Action", id: 76341 },
		{ genre: "Science-fiction", id: 157336 },
		{ genre: "Thriller", id: 27205 },
		{ genre: "Familial", id: 552524 },
	];

	useEffect(() => {
		fetch(`${import.meta.env.VITE_TMDB_API_URL}movie/popular?page=1`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((res) => res.json())
			.then((popularMovies) => {
				setPopularMovies(popularMovies.results);
			});

		representativeMovies.map(({ genre, id }) => {
			fetch(`${import.meta.env.VITE_TMDB_API_URL}movie/${id}`, {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
				},
			})
				.then((res) => res.json())
				.then((movie) => {
					setGenreImages((previousRepMovies) => ({
						...previousRepMovies,
						[genre]: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
					}));
				});
		});
	}, []);

	useEffect(() => {
		const filtered = getAllMovies.filter((m) =>
			m.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
		);

		const searchValueNotEmpty = searchValue.trim().length > 0;
		filtered && searchValueNotEmpty ? setIsOpen(true) : setIsOpen(false);

		setFilteredMovies(filtered);

		// setIsOpen(searchValue.trim().length > 0);
	}, [searchValue, getAllMovies, setFilteredMovies, setIsOpen]);

	return (
		<>
			{isOpen ? (
				<MovieSearchModal filteredMovies={filteredMovies} />
			) : (
				<>
					<header className="header-section-center header-section-home">
						<h1 className="primary-title width-title-section">
							Ta prochaine soirée ciné commence ici !
						</h1>
						<p className="body-text width-title-section">
							Réponds à notre petit quiz et reçoit des recommandations de films
							personnalisées qui correspondent à ton humeur du moment.
						</p>
						<div className="buttons-container">
							<Link
								to="/quiz"
								className="primary-button"
								onClick={() => {
									setLaunch(true);
									window.scrollTo({ top: 0, left: 0 });
								}}
							>
								Lance le quiz
							</Link>
							<Link
								to="/quiz"
								className="primary-button btn-empty"
								onClick={() => {
									setLaunch(false);
									window.scrollTo({ top: 0, left: 0 });
								}}
							>
								En savoir plus
							</Link>
						</div>
					</header>

					<div className="primary-background">
						<section className="selection-de-la-semaine">
							<h2 className="secondary-title home-secondary-title">
								Notre <span className="body-text-blue">sélection</span> de la
								semaine
							</h2>
							{popularMovies && popularMovies.length > 0 ? (
								<CarouselMovie movies={popularMovies} />
							) : (
								<div className="loading-movies">
									<OrbitProgress
										variant="track-disc"
										color="#05a6d6"
										dense
										size="medium"
									/>
								</div>
							)}
						</section>

						<section className="header-section-center random-section">
							<h2 className="primary-title">Laisse la chance décider</h2>
							<p className="body-text">
								Reçois une recommandation tirée au sort rien que pour toi
							</p>
							<Link
								to="/recommandations"
								className="primary-button blue-button"
								onClick={() => window.scrollTo({ top: 0, left: 0 })}
							>
								Surprends-moi
							</Link>
						</section>

						<section className="header-section-center home-genres-section">
							<h2 className="secondary-title">Catégories populaires</h2>
							<div className="catalog-preview-container">
								{representativeMovies.map(({ genre }) => (
									<div key={genre} className="catalog-preview">
										<Link to="/catalogue">
											<img src={genreImages[genre]} alt={genre} />

											<div>
												<p className="primary-button show-genre">{genre}</p>
											</div>
										</Link>
									</div>
								))}
							</div>
						</section>
					</div>
				</>
			)}
		</>
	);
}

export default Home;
