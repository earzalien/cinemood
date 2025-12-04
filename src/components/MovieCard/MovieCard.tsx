import "./MovieCard.css";
import "./MovieCard-mobile.css";
import { Link } from "react-router";
import { useAlreadySeenMovieList } from "../../context/AlreadySeenMovieListContext";
import { useFavoriteMoviesList } from "../../context/FavoriteMovieListContext";
import { useWatchListMovies } from "../../context/WatchListMoviesContext";
import type { MovieData } from "../../types/MovieType";
import Tag from "../Tag/Tag";

type MovieCardProps = {
	movie: MovieData;
};

function MovieCard({ movie }: MovieCardProps) {
	const imageUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";
	const { AlreadySeenMovieList, setAlreadySeenMovieList } =
		useAlreadySeenMovieList();
	const { FavoriteMoviesList, setFavoriteMoviesList } = useFavoriteMoviesList();
	const { WatchListMovies, setWatchListMovies } = useWatchListMovies();

	return (
		<>
			<div className="movie-card-wraper">
				<div className="movie-card">
					<Link
						to={`/film/${movie.id}`}
						onClick={() => {
							window.scrollTo({ top: 0, left: 0 });
						}}
					>
						<img src={imageUrl} alt={movie.title} className="movie-image" />
					</Link>
					<div className="show-mini-details">
						<p className="title-small-carousel">{movie.title}</p>
						<div className="tag-list-carousel">
							<Tag
								className="icon-small-carousel"
								list={FavoriteMoviesList}
								setter={setFavoriteMoviesList}
								icon="bi bi-suit-heart"
								movie={movie}
							/>
							<Tag
								className="icon-small-carousel"
								list={WatchListMovies}
								setter={setWatchListMovies}
								icon="bi bi-plus-circle"
								movie={movie}
							/>
							<Tag
								className="icon-small-carousel"
								list={AlreadySeenMovieList}
								setter={setAlreadySeenMovieList}
								icon="bi bi-eye"
								movie={movie}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MovieCard;
