export class Endpoints{
    static MOVIES: string = 'discover/movie';
    static TV_SHOWS: string = 'discover/tv';
    static MOVIE_ID = (movie_id:string|null) => `movie/${movie_id}`;
    static TV_ID = (series_id:string|null) => `tv/${series_id}`;
    static TRENDS:string = 'trending/all/day';
    static IMG_BASE:string = 'https://image.tmdb.org/t/p/w500/';
    static MOVIES_PLAYING = 'movie/now_playing';
    static MOVIES_POPULAR = 'movie/popular';
    static MOVIES_TOP_RATED = 'movie/top_rated';
    static MOVIES_UPCOMING = 'movie/upcoming';
    static TV_AIR_TODAY = 'tv/airing_today';
    static TV_ON_AIR = 'tv/on_the_air';
    static TV_POPULAR = 'tv/popular';
    static TV_TOP_RATED = 'tv/top_rated';
    static MOVIE_RECOMMEND = (movie_id: string | null) => `movie/${movie_id}/recommendations`;
    static TV_RECOMMEND = (series_id: string | null) => `tv/${series_id}/recommendations`;
}