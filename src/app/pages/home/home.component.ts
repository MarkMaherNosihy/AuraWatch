import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SegmentedControlComponent } from "../../components/segmented-control/segmented-control.component";
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from "../../components/media-card/media-card.component";
import { ApiService } from '../../services/api.service';
import { Endpoints } from '../../endpoints/endpoints';
import { filter, map, tap } from 'rxjs';
import { Media, MediaItem } from '../../models/media.interface';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginatorComponent } from "../../components/paginator/paginator.component";
import { FavoriteService } from '../../services/favorite.service';
import { FormsModule } from '@angular/forms';
import { Page } from '../../models/page.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SegmentedControlComponent, CommonModule, FormsModule, MediaCardComponent, RouterLink, NgxSkeletonLoaderModule, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  httpService = inject(ApiService);
  favService = inject(FavoriteService);
  auth = inject(AuthService);
  keyword: string = '';
  isInputFocused = false;
  selectedMediaFilter: string = 'all';
  trendsList!: Media[];
  favorites: MediaItem[] = [];
  // pageChanged: EventEmitter<Page> = new EventEmitter<Page>();
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 500;
  dummyCards = Array.from({ length: 20 }, (_, index) => ({
    title: `Card Title ${index + 1}`,
    description: `This is a description for card number ${index + 1}.`
  }));

  // Inject Router and ActivatedRoute
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // Fetch the page number from query parameters
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      const page = +params['page'] || 1; // Default to page 1 if not specified

      if (query) {
        this.keyword = query;
        this.search(query, page);
        return;
      }

      this.currentPage = page;
      this.fetchTrendingMovies(page);
    });
    if(this.auth.isAuthenticated()){
      this.favService.getAllFav().subscribe((favorites) => {
        this.favorites = favorites;
      })
    }
}

  onSearch(){
    if(this.keyword !== ''){
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { query: this.keyword },
        queryParamsHandling: 'merge'  // Keep any other query params in the URL
      });
    }
  }
  search(keyword: string, page:number){
    this.isLoading = true;
    this.httpService.get<Media[]>(Endpoints.SEARCH, `query=${keyword}&page=${page}`).pipe(tap((res: any)=>this.totalPages = res.total_pages), map((res:any)=>{
      this.totalPages = res.total_pages
      return res.results.filter((item: Media)=>item.media_type !== 'person')
    })).subscribe({
      next: (res: any)=>{
        this.trendsList = res;
        this.isLoading=false;
        this.currentPage = page;
      },
      error: (err: any)=>{
        this.isLoading =false;
      }
    });
  }
  isFavorite(media: Media): boolean {
    return this.favorites.some((fav) => fav.media.id === media.id);
  }
  isWatched(media: Media): boolean{
    return this.favorites.some((fav)=>{
      if(fav.media.id === media.id && fav.media.isWatched === true){
        return true;
      }
      return false;
    })
  }
  fetchTrendingMovies(page: number): void {
    this.isLoading = true;
    this.httpService.get(Endpoints.TRENDS, `language=en-US&page=${page}`).pipe(
      tap((res: any)=> this.totalPages = res.total_pages),
      map(
        (res: any)=>res.results.filter((item: any)=> item.media_type !== 'person'))).subscribe({
      next: (res: any) => {
        this.trendsList = res;
        this.isLoading = false;
        console.log(res);
      },
      error: (err: any) => {
        this.isLoading = false;
      }
    });
  }

  onFocus() {
    this.isInputFocused = true;
  }

  onBlur(): void {
    this.isInputFocused = false;
  }

  onMediaFilterChange(val: string) {
    this.selectedMediaFilter = val;
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
}
