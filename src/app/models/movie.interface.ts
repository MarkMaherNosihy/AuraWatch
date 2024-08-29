import { Genre } from "./genre.interface"

export interface Movie {
    backdrop_path: string
    genres: Genre[]
    id: number
    original_title: string
    overview: string
    poster_path: string
    release_date: string
    runtime: number
    tagline: string
    title: string
    vote_average: number
    vote_count: number
  }
