import { createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../types/filterTypes";
import type { SearchbarContextType } from "../types/SearchbarContextType";
import { getAllMovies as fetchAllMovies } from "../api";

export const SearchbarContext = createContext<SearchbarContextType>({
	getAllMovies: [],
	searchValue: "",
	setSearchValue: () => {},
	searchPropOpen: false,
	setSearchPropOpen: () => {},
	filteredMovies: [],
	setFilteredMovies: () => {},
	isOpen: false,
	setIsOpen: () => {},
});

export function useSearchbar() {
	const context = useContext(SearchbarContext);

	if (!context) {
		throw new Error("useSearchbar is outside its provider");
	}
	return context;
}

function SearchbarProvider({
	children,
}: { children: React.ReactNode }): JSX.Element {
	const [getAllMovies, setGetAllMovies] = useState<Movie[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [searchPropOpen, setSearchPropOpen] = useState(false);
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		async function load() {
			const movies = await fetchAllMovies();
			setGetAllMovies(movies);
		}
		load();
	}, []);

	return (
		<SearchbarContext.Provider
			value={{
				getAllMovies,
				searchValue,
				setSearchValue,
				searchPropOpen,
				setSearchPropOpen,
				filteredMovies,
				setFilteredMovies,
				isOpen,
				setIsOpen,
			}}
		>
			{children}
		</SearchbarContext.Provider>
	);
}

export default SearchbarProvider;
