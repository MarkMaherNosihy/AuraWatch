import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { MediaCardComponent } from "../media-card/media-card.component";
import { ApiService } from '../../services/api.service';
import { Endpoints } from '../../endpoints/endpoints';
import { Media } from '../../models/media.interface';
import { RecommendationsCardComponent } from "./recommendations-card/recommendations-card.component";
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '../../directives/swiper.directive';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [MediaCardComponent, RecommendationsCardComponent, SwiperDirective, RouterModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecommendationsComponent implements OnInit {
  api = inject(ApiService); 
  @Input() id!:string | null;
  @Input() type!: string | null;
  navigationOptions = {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  };
  swiperConfig: SwiperOptions = {
    navigation: this.navigationOptions,
    breakpoints: {
      1200:{
        slidesPerView: 4
      },
      560: {
        slidesPerView: 3
      },
      420: {
        slidesPerView: 2
      }
    },
    spaceBetween: 20,
    speed: 500,
    loop: true,
    
  }; 
  list!: Media[];
  ngOnInit(): void {
    const endpoint = this.type === 'movie' ? Endpoints.MOVIE_RECOMMEND(this.id) : Endpoints.TV_RECOMMEND(this.id)
    this.api.get(endpoint, '').subscribe({
      next:(res: any)=>{
        this.list = res.results;
      },
      error: (err: any)=>{
      }
    })  
  }
}
