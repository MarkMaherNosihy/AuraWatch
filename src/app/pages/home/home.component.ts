import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SegmentedControlComponent } from "../../components/segmented-control/segmented-control.component";
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from "../../components/media-card/media-card.component";
import { ApiService } from '../../services/api.service';
import { Endpoints } from '../../endpoints/endpoints';
import { map } from 'rxjs';
import { Trend } from '../../models/trends.interface';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SegmentedControlComponent, CommonModule, MediaCardComponent, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  httpService = inject(ApiService);
  isInputFocused = false;
  selectedMediaFilter: string = 'all';
  trendsList!: Trend[];
  isLoading: boolean = true;
  dummyCards = Array.from({ length: 20 }, (_, index) => ({
    title: `Card Title ${index + 1}`,
    description: `This is a description for card number ${index + 1}.`
  }));
  ngOnInit(): void {
    this.httpService.get(Endpoints.TRENDS).pipe(map((res: any)=>{return res.results})).subscribe({
      next: (res)=>{
        this.trendsList = res;
        console.log(res);
        this.isLoading= false;
      },
        error: (err: any)=>{
          console.log(err);
        this.isLoading= false;
      }
    });
  }
  onFocus(){
    this.isInputFocused = true;
  }
  onBlur(): void {
    this.isInputFocused = false;
  }
  onMediaFilterChange(val: string){
    this.selectedMediaFilter = val;
  }
}
