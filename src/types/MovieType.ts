export interface ReleaseDate {
	certification: string;
	release_date: string;
	[key: string]: unknown;
}

export interface ReleaseCountry {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
}

export interface MovieData {
	id: number;
	title?: string | undefined;
	release_date?: string;
	vote_average?: number;
	runtime?: number;
	overview?: string;
	poster_path?: string;
	backdrop_path?: string;

	production_countries?: { name: string }[];
	production_companies?: { name: string }[];

	genres?: { name: string }[];

	certification?: string;

	release_dates?: {
		results: ReleaseCountry[];
	};
	[key: string]: unknown;
}
