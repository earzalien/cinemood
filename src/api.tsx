const apiUrl = import.meta.env.VITE_TMDB_API_URL;
const accessToken = import.meta.env.VITE_TMDB_API_KEY;

const options: RequestInit = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${accessToken}`,
	},
};

async function fetchFromTMDB(url: string) {
	try {
		const res = await fetch(url, options);
		const data = await res.json();
		return data;
	} catch (err) {
		console.error("TMDB Request Error:", err);
		return null;
	}
}

async function getMoviesByPage(page: number) {
	const url = `${apiUrl}discover/movie?language=fr-FR&include_adult=false&include_video=false&vote_average.gte=5&primary_release_date.gte=1960-01-01&vote_count.gte=100&page=${page}`;

	const data = await fetchFromTMDB(url);
	return data?.results ?? [];
}

export async function getAllMovies() {
	const nbMovie = 1000;
	const totalPages = Math.ceil(nbMovie / 20);

	const movies: any[] = [];

	for (let page = 1; page <= totalPages; page++) {
		const pageMovies = await getMoviesByPage(page);
		movies.push(...pageMovies);
	}

	const uniqueMovies = movies.filter(
		(movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
	);

	return uniqueMovies.slice(0, nbMovie);
}

export async function getGenresMovies() {
	const url = `${apiUrl}genre/movie/list?language=fr-FR`;

	const data = await fetchFromTMDB(url);
	return data?.genres ?? [];
}

export async function getPopularMovies() {
	const url = `${apiUrl}movie/popular?language=fr-FR&page=1`;

	const data = await fetchFromTMDB(url);
	return data?.results ?? [];
}

export async function getTopRatedMovies() {
	const url = `${apiUrl}movie/top_rated?language=fr-FR&page=1`;

	const data = await fetchFromTMDB(url);
	return data?.results ?? [];
}

export async function getNowPlayingMovies() {
	const url = `${apiUrl}movie/now_playing?language=fr-FR&page=1`;

	const data = await fetchFromTMDB(url);
	return data?.results ?? [];
}

export async function getUpcomingMovies() {
	const url = `${apiUrl}movie/upcoming?language=fr-FR&page=1`;

	const data = await fetchFromTMDB(url);
	return data?.results ?? [];
}
