export type GenreItem = {
	id: number;
	name: string;
};

export type GenreResponse = {
	genres: GenreItem[];
};

export type Movie = {
	backdrop_path: string;
	genre_ids: number[];
	poster_path: string;
	release_date: string;
	title: string;
	vote_average: number;
};

export type FilterProps = {
	genre: GenreResponse;
	movies: Movie[];
	setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
