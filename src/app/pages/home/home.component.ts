import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SegmentedControlComponent } from "../../components/segmented-control/segmented-control.component";
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from "../../components/media-card/media-card.component";
import { ApiService } from '../../services/api.service';
import { Endpoints } from '../../endpoints/endpoints';
import { map } from 'rxjs';
import { Media } from '../../models/media.interface';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginatorComponent } from "../../components/paginator/paginator.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SegmentedControlComponent, CommonModule, MediaCardComponent, RouterLink, NgxSkeletonLoaderModule, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  httpService = inject(ApiService);
  isInputFocused = false;
  selectedMediaFilter: string = 'all';
  trendsList!: Media[];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages!: number;
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
      const page = +params['page'] || 1; // Default to page 1 if not specified
      this.currentPage = page;
      this.fetchTrendingMovies(page);
    });
  }

  fetchTrendingMovies(page: number): void {
    this.isLoading = true;
    this.httpService.get(Endpoints.TRENDS, `language=en-US&page=${page}`).subscribe({
      next: (res: any) => {
        this.trendsList = res.results;
        this.totalPages = res.total_pages;
        this.isLoading = false;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
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
