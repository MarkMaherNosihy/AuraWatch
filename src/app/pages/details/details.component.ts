import { Component, inject, OnInit } from '@angular/core';
import { RatingComponent } from "../../components/rating/rating.component";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Endpoints } from '../../endpoints/endpoints';
import { Movie } from '../../models/movie.interface';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TV } from '../../models/tv.interface';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RecommendationsComponent } from "../../components/recommendations/recommendations.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RatingComponent, CommonModule, NgxSkeletonLoaderModule, RecommendationsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  api = inject(ApiService);
  movieDetails!: Movie;
  tvShowDetails!: TV;
  selectedMedia!: string | null;
  type!: string | null;
  contentLoading: boolean = true;

    ngOnInit(): void {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      this.selectedMedia = this.route.snapshot.paramMap.get('id');
      this.type = this.route.snapshot.paramMap.get('type');
      if(this.type === 'movie'){
        this.fetchMovie();
      }else{
        this.fetchTvShow();
      }
    }
    fetchMovie(){
      this.api.get(`${Endpoints.MOVIE_ID(this.selectedMedia)}`, '').pipe(
        map((res: any): Movie => {
          console.log(res);
          return {
            backdrop_path: res.backdrop_path,
            genres: res.genres,
            id: res.id,
            original_title: res.original_title,
            overview: res.overview,
            poster_path: res.poster_path,
            release_date: res.release_date,
            runtime: res.runtime,
            tagline: res.tagline,
            title: res.title,
            vote_average: res.vote_average,
            vote_count: res.vote_count
          };
        })
      ).subscribe({
        next: (movieDetails: Movie) => {
          this.movieDetails = movieDetails;
          this.contentLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.contentLoading = false;
        }
      });
    }
    fetchTvShow(){
      this.api.get(`${Endpoints.TV_ID(this.selectedMedia)}`, '').pipe(
        map((res: any): TV => {
          return {
            backdrop_path: res.backdrop_path,
            genres: res.genres,
            name: res.name,
            original_name: res.original_name,
            overview: res.overview,
            number_of_episodes: res.number_of_episodes,
            number_of_seasons: res.number_of_seasons,
            last_air_date: res.last_air_date,
            poster_path: res.poster_path,
            status: res.status,
            first_air_date: res.first_air_date,
            tagline: res.tagline,
            vote_average: res.vote_average,
            vote_count: res.vote_count
          };
        })
      ).subscribe({
        next: (tvShowDetails: TV) => {
          this.tvShowDetails = tvShowDetails;
          this.contentLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.contentLoading = false;
        }
      });
    }

}
