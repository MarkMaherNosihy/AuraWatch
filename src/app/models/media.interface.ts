export interface MediaItem {
  _id: string;
  media: Media,
  userId: string;
  __v: number;
}

export interface Media {
  id: number;
  original_title?: string;
  poster_path: string;
  vote_average: number;
  name?: string;
  media_type?: string;
  isWatched: boolean;
}

