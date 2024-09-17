import { Genre } from "./genre.interface"

export interface TV {
    backdrop_path: string
    first_air_date: string
    genres: Genre[]
    last_air_date: string
    name: string
    number_of_episodes: number
    number_of_seasons: number
    original_name: string
    overview: string
    poster_path: string
    status: string
    tagline: string
    vote_average: number
    id:number;
    vote_count: number
  }
  
  