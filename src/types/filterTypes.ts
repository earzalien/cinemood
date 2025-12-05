export type GenreItem = {
	id: number;
	name: string;
};

export type GenreResponse = {
	genres: GenreItem[];
};

export type Movie = {
	id: number;
	backdrop_path: string;
	genre_ids: number[];
	poster_path: string | undefined;
	release_date: string;
	title: string;
	vote_average: number;
};

export type FilterProps = {
	genreListApi: any;
	movies: Movie[];
	filteredMovies: Movie[];
	setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
