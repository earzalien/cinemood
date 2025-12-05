import { useCallback, useEffect, useState } from "react";
import RecosCarousel from "../../components/RecosCarousel/RecosCarousel";
import "./Recos.css";
import { Link } from "react-router";
import { useQuiz } from "../../context/QuizContext";
import type { MovieData } from "../../types/MovieType";
import { useLaunch } from "../../context/LaunchQuiz";

export default function Recos() {
	const { quizAnswers } = useQuiz();
	const quizTaken = quizAnswers.length > 0;
	const [movieRecos, setMovieRecos] = useState<MovieData[]>([]);
	const randomStartIndex = Math.floor(Math.random() * 14);
	const { setLaunch } = useLaunch();
	const fetchMovie = useCallback(() => {
		const randomPage = Math.floor(Math.random() * 500) + 1;

		const url = quizTaken
			? `${import.meta.env.VITE_TMDB_API_URL}discover/movie?page=1&language=fr-FR&with_genres=${quizAnswers.join(",")}`
			: `${import.meta.env.VITE_TMDB_API_URL}discover/movie?include_adult=false&include_video=false&language=fr-FR&vote_average.gte=5&primary_release_date.gte=1960-01-01&vote_count.gte=100&page=${randomPage}`;

		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
				accept: "application/json",
			},
		};

		if (!url) return;

		fetch(url, options)
			.then((response) => response.json())
			.then((movies) =>
				setMovieRecos(
					movies.results.filter((movie: MovieData) => movie.poster_path),
				),
			)
			.catch(console.error);
	}, [quizTaken, quizAnswers]);

	useEffect(() => {
		fetchMovie();
	}, [fetchMovie]);

	return (
		<>
			<div className="recos-bg">
				<section className="header-section-center">
					{quizTaken ? (
						<>
							<h1 className="primary-title">
								Découvre ta sélection ciné
								<span className="body-text-blue"> personnalisée</span> !
							</h1>
							<p className="body-text">
								En fonction de ton humeur du moment, <br /> voici 6 films
								sélectionnés
								<span className="body-text-bold"> spécialement pour toi</span>
							</p>
						</>
					) : (
						<>
							<h1 className="primary-title">
								Six films<span className="body-text-blue"> au hasard</span>
								<br />
								rien que pour toi !
							</h1>
							<p className="body-text">
								Laisse-toi surprendre par ces titres tirés au sort. Prêt à
								découvrir
								<span className="body-text-bold"> de nouvelles pépites </span>?
							</p>
						</>
					)}
				</section>

				<RecosCarousel
					movieRecos={movieRecos}
					randomStartIndex={randomStartIndex}
				/>

				{quizTaken ? (
					<>
						<div className="link-center-container">
							<Link
								to="/quiz"
								className="primary-button low-emphasis-button"
								onClick={() => {
									setLaunch(true);
									window.scrollTo({ top: 0, left: 0 });
								}}
							>
								Redémarrer le quiz
							</Link>
						</div>
					</>
				) : (
					<div className="link-center-container">
						<button
							type="button"
							className="primary-button low-emphasis-button"
							onClick={() => {
									fetchMovie();
									window.scrollTo({ top: 0, left: 0 });
								}}
						>
							Nouvelle sélection
						</button>
					</div>
				)}
			</div>
		</>
	);
}
