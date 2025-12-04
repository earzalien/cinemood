import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecosCarousel.css";
import "./Recos-mobile.css";
import { OrbitProgress } from "react-loading-indicators";
import { Link } from "react-router";
import { useAlreadySeenMovieList } from "../../context/AlreadySeenMovieListContext";
import { useFavoriteMovieList } from "../../context/FavoriteMovieListContext";
import { useWatchListMovie } from "../../context/WatchListMovieContext";
import Tag from "../Tag/Tag";
import type { MovieData } from "../../types/MovieType";

export default function RecosCarousel({
	movieRecos,
	randomStartIndex,
}: RecosCarouselProps) {
	const { AlreadySeenMovieList, setAlreadySeenMovieList } =
		useAlreadySeenMovieList();
	const { FavoriteMovieList, setFavoriteMovieList } = useFavoriteMovieList();
	const { WatchListMovie, setWatchListMovie } = useWatchListMovie();
	const settings = {
		centerMode: true,
		centerPadding: "0px",
		infinite: true,
		initialSlide: 2,
		slidesToScroll: 1,
		slidesToShow: 3,
		speed: 500,
		cssEase: "ease-in-out",
		dots: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
				},
			},
		],
	};

	return (
		<>
			{movieRecos && movieRecos.length > 0 ? (
				<div className="recos-slider-container">
					<Slider {...settings}>
						{movieRecos
							.slice(randomStartIndex, randomStartIndex + 6)
							.map((movie) => (
								<div className="recos-img-wrapper" key={movie.id}>
									<Link to={`/film/${movie.id}`} target="_blank">
										<img
											className="recos-movie-poster"
											src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt={movie.title}
										/>
										{/* <div className="primary-button link-movie-details">
											En savoir plus
										</div> */}
									</Link>
									<div className="show-mini-details">
										<p className="title-small-carousel">{movie.title}</p>
										<div className="tag-list-carousel">
											<Tag
												className="icon-small-carousel"
												list={FavoriteMovieList}
												setter={setFavoriteMovieList}
												icon="bi bi-suit-heart"
												movie={movie}
											/>
											<Tag
												className="icon-small-carousel"
												list={WatchListMovie}
												setter={setWatchListMovie}
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
							))}
					</Slider>
				</div>
			) : (
				<div className="loading-movies">
					<OrbitProgress
						variant="track-disc"
						color="#05a6d6"
						dense
						size="medium"
						text=""
						textColor=""
					/>
				</div>
			)}
		</>
	);
}

interface RecosCarouselProps {
	movieRecos: MovieData[];
	randomStartIndex: number;
}
