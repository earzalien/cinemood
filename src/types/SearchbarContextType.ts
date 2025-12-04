import type { Movie } from "./filterTypes";

export type SearchbarContextType = {
	getAllMovies: Movie[];
	searchValue: string;
	setSearchValue: (value: string) => void;
	searchPropOpen: boolean;
	setSearchPropOpen: (value: boolean) => void;
	filteredMovies: Movie[];
	setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
};
