import { useEffect, useState } from "react";
import "./SearchInput.css";
import { useSearchbar } from "../../context/SearchBarContext";
import type { MovieData } from "../../types/MovieType";

function SearchInput() {
	const [searchTitleProp, setSearchTitleProp] = useState<MovieData[]>([]);
	const {
		searchValue,
		setSearchValue,
		searchPropOpen,
		setSearchPropOpen,
		getAllMovies,
		setFilteredMovies,
	} = useSearchbar();

	useEffect(() => {
		setSearchTitleProp(
			getAllMovies.filter((movie) =>
				movie.title.toLowerCase().includes(searchValue.toLowerCase()),
			),
		);
	}, [searchValue, getAllMovies]);

	return (
		<div
			onMouseLeave={() => setSearchPropOpen(false)}
			onMouseEnter={() => searchValue.length !== 0 && setSearchPropOpen(true)}
		>
			<form className="search-wraper">
				<input
					value={searchValue}
					type="text"
					className="search-bar"
					placeholder="Recherche"
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</form>
			<div
				className={`movieprop-dropdown ${searchPropOpen ? "show-prop" : ""}`}
			>
				{searchTitleProp.map((movie) => (
					<p
						key={movie.id}
						className="prop-text"
						onClick={() => {
							setFilteredMovies([movie]);
							setSearchPropOpen(false);
						}}
						onKeyDown={() => setFilteredMovies([movie])}
					>
						{movie.title}
					</p>
				))}
			</div>
		</div>
	);
}

export default SearchInput;
