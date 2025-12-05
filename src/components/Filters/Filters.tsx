import { useEffect, useState } from "react";
import "./Filters.css";
import "./Filters-mobile.css";
import { useSearchbar } from "../../context/SearchBarContext";
import type { FilterProps, GenreItem } from "../../types/filterTypes";

function Filters({
	genreListApi,
	movies,
	setFilteredMovies,
	isOpen,
	setIsOpen,
}: FilterProps) {
	const [open, setOpen] = useState(false);
	const [yearOpen, setYearOpen] = useState(false);
	const [combinedGenres, setCombinedGenres] = useState<number[]>([]);
	const [minYear, setMinYear] = useState<number | null>(1950);
	const [maxYear, setMaxYear] = useState<number | null>(2025);
	const [ratingOpen, setRatingOpen] = useState(false);
	const [rating, setRating] = useState<number | null>(null);
	const { searchValue, setSearchValue, setSearchPropOpen } = useSearchbar();

	const selectGenre = (g: GenreItem) => {
		let update = [];
		if (combinedGenres.includes(g.id)) {
			update = combinedGenres.filter((id) => id !== g.id);
		} else {
			update = [...combinedGenres, g.id];
		}

		setCombinedGenres(update);
	};
	const selectYear = (
		min: string | number | null,
		max: string | number | null,
	) => {
		setMinYear(min ? Number(min) : null);
		setMaxYear(max ? Number(max) : null);
		setIsOpen(true);
	};

	useEffect(() => {
		let results = [...movies];

		results = results.filter((movie) =>
			movie.title.toLowerCase().includes(searchValue.toLowerCase()),
		);

		if (combinedGenres.length > 0) {
			results = results.filter((movie) =>
				combinedGenres.every((id) => movie.genre_ids.includes(id)),
			);
		}

		results = results.filter((movie) => {
			if (rating === null) return true;

			const movieRating = Number(movie.vote_average);
			return rating < movieRating;
		});

		results = results.filter((movie) => {
			const year = Number(movie.release_date.slice(0, 4));
			if (minYear != null && year < minYear) return false;
			if (maxYear != null && year > maxYear) return false;
			return true;
		});

		setFilteredMovies(results);
	}, [
		movies,
		combinedGenres,
		minYear,
		maxYear,
		rating,
		searchValue,
		setFilteredMovies,
	]);

	useEffect(() => {
		const isInputEmpty = searchValue.trim().length > 0;
		setIsOpen(isInputEmpty);
		setSearchPropOpen(isInputEmpty);
	}, [searchValue, setIsOpen, setSearchPropOpen]);

	return (
		<>
			<div className="filters">
				{!isOpen && (
					<button
						type="button"
						className="primary-button"
						onClick={() => setIsOpen(true)}
					>
						Afficher les filtres
					</button>
				)}

				{isOpen && (
					<>
						<div onMouseLeave={() => setOpen(false)}>
							<button
								type="button"
								className="dropdown-btn"
								onMouseEnter={() => setOpen(true)}
							>
								Genre
							</button>
							<div className={`dropdown-content ${open ? "show" : ""}`}>
								{genreListApi?.map((g: GenreItem) => (
									<button
										className={`genre-link ${
											combinedGenres.includes(g.id) ? "active" : ""
										}`}
										type="button"
										key={g.name}
										onClick={() => {
											setIsOpen(true);
											selectGenre(g);
										}}
									>
										{g.name}
									</button>
								))}
							</div>
						</div>
						<div className="dropdown" onMouseLeave={() => setYearOpen(false)}>
							<button
								type="button"
								className="dropdown-btn"
								onMouseEnter={() => setYearOpen(true)}
							>
								Annee
							</button>
							<div className={`year-content ${yearOpen ? "show-year" : ""}`}>
								<select
									className="year-select"
									value={minYear ?? ""}
									onChange={(e) => selectYear(e.target.value, maxYear)}
								>
									{Array.from({ length: 2025 - 1950 + 1 }, (_, i) => {
										const year = 1950 + i;
										return (
											<option key={year} value={year}>
												{year}
											</option>
										);
									})}
								</select>
								<select
									className="year-select"
									value={maxYear ?? ""}
									onChange={(e) => selectYear(minYear, e.target.value)}
								>
									{Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i)
										.reverse()
										.map((year) => (
											<option key={year} value={year}>
												{year}
											</option>
										))}
								</select>
							</div>
						</div>

						<div className="dropdown" onMouseLeave={() => setRatingOpen(false)}>
							<button
								className="dropdown-btn"
								type="button"
								onMouseEnter={() => setRatingOpen(true)}
							>
								Note minimale
							</button>
							<div
								className={`rating-content ${ratingOpen ? "show-rating" : ""}`}
							>
								<select
									className="rating-select"
									value={rating ?? ""}
									onChange={(e) => {
										setRating(Number(e.target.value));
										setIsOpen(true);
									}}
								>
									{Array.from({ length: 10 }, (_, i) => i + 1)
										.reverse()
										.map((num) => (
											<option key={num} value={num}>
												{num}
											</option>
										))}
								</select>
							</div>
						</div>
						<button
							type="button"
							className="close-btn"
							onClick={() => {
								setIsOpen(false);
								setCombinedGenres([]);
								setFilteredMovies(movies);
								setMinYear(1950);
								setMaxYear(2025);
								setRating(null);
								setSearchValue("");
							}}
						>
							<img
								src="/filterimages/close_btn_icon.png"
								alt="X"
								style={{ width: "18px" }}
							/>
						</button>
					</>
				)}
			</div>

			{isOpen && (
				<div className="selected-genres">
					{combinedGenres.map((id) => {
						const g = genreListApi?.find((item: GenreItem) => item.id === id);
						if (!g) return null;

						return (
							<button
								type="button"
								className="selected-genre-btn"
								key={id}
								onClick={() => selectGenre(g)}
							>
								{g.name}
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}

export default Filters;
