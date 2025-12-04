import type { MovieData } from "./MovieType";

export type SearchbarContextType = {
	getAllMovies: MovieData[];
	searchValue: string;
	setSearchValue: (value: string) => void;
	searchPropOpen: boolean;
	setSearchPropOpen: (value: boolean) => void;
	filteredMovies: MovieData[];
	setFilteredMovies: (movies: MovieData[]) => void;
};
