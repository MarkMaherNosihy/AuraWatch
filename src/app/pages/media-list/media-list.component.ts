import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { TV } from '../../models/tv.interface';
import { Endpoints } from '../../endpoints/endpoints';
import { ApiService } from '../../services/api.service';
import { Media } from '../../models/media.interface';
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { SelectComponent } from "../../components/_forms/select/select.component";
import { SelectOption } from '../../models/form_models/select-option.interface';
import { skip, Subscription } from 'rxjs';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, MediaCardComponent, RouterModule, PaginatorComponent, SelectComponent],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss'
})
export class MediaListComponent implements OnInit {

  route = inject(ActivatedRoute);
  api = inject(ApiService);
  router = inject(Router);
  mediaType!: string;
  mediaList!: Media[];
  
  moviesFilterOptions: SelectOption[] = [
    {label: 'Popular', value: Endpoints.MOVIES_POPULAR},
    {label: 'Playing', value: Endpoints.MOVIES_PLAYING},
    {label: 'Top Rated', value: Endpoints.MOVIES_TOP_RATED},
    {label: 'Upcoming', value: Endpoints.MOVIES_UPCOMING},
  ]
  tvFilterOtions: SelectOption[] =[
    {label: 'Popular', value: Endpoints.TV_POPULAR},
    {label: 'Airing Today', value: Endpoints.TV_AIR_TODAY},
    {label: 'On Air', value: Endpoints.TV_ON_AIR},
    {label: 'Top Rated', value: Endpoints.TV_TOP_RATED},
  ]
  movieEndpoint: string = Endpoints.MOVIES_POPULAR;
  tvEndpoint: string = Endpoints.TV_POPULAR;
  currentPage: number = 1;
  totalPages!: number;
  dummyCards = Array.from({ length: 20 }, (_, index) => ({
    title: `Card Title ${index + 1}`,
    description: `This is a description for card number ${index + 1}.`
  }));
  isLoading: boolean = true;
  queryParamsSubscription!: Subscription;

  ngOnInit(): void {
    this.mediaType = this.route.snapshot.url[0].path;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 1; // Default to page 1 if not specified
      const listEndpoint = params['list'] ? params['list'] : (this.mediaType === 'movies' ? this.movieEndpoint : this.tvEndpoint);
      this.currentPage = page;
      this.fetchMedia(this.currentPage, listEndpoint);
    });

  }

  fetchMedia(page: number, endpoint: string) {
    this.api.get(endpoint, `page=${page}`).subscribe({
      next: (res: any) => {
        this.mediaList = res.results;
        this.totalPages = res.total_pages;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  onPagination(page: number) {
    // Update the query parameters with the new page number
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge' // Keeps existing query parameters
    });
    document.documentElement.scrollTop = 0;
  }

  onSelect(endpoint: string){
    this.currentPage = 1;

    // this.queryParamsSubscription.unsubscribe();
    this.router.navigate([],{
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        page: this.currentPage,
        list: endpoint
      }
    })


  }
  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
