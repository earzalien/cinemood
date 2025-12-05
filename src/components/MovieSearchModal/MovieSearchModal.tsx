import MovieCard from "../MovieCard/MovieCard";

function MovieSearchModal({ filteredMovies }: any) {
	return (
		<div className="modal-catalog primary-background">
			{filteredMovies.length > 0 ? (
				filteredMovies.map((movie: any) => (
					<MovieCard key={movie.id} movie={movie} />
				))
			) : (
				<h1 className="secondary-title resurch-no-results">
					Aucun résultat n'a été trouvé pour votre recherche.
				</h1>
			)}
		</div>
	);
}

export default MovieSearchModal;
