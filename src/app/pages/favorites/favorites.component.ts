import { Component, inject, OnInit } from '@angular/core';
import { Media, MediaItem } from '../../models/media.interface';
import { FavoriteService } from '../../services/favorite.service';
import { RatingComponent } from "../../components/rating/rating.component";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RatingComponent, ToastrModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class FavoritesComponent implements OnInit {

  favorites!: MediaItem[];
  favoriteService = inject(FavoriteService);
  toaster = inject(ToastrService);

  ngOnInit(): void {
    this.favoriteService.getAllFav().subscribe({
      next: (res: MediaItem[])=>{
        this.favorites = res;
        console.log(res);
      },
      error: (err:any)=>{
        console.log(err);
      }
    })
  }

  deleteFavorite(id: string){
    this.favoriteService.deleteFavById(id).subscribe({
      next: (res: any)=>{
        console.log(res);
        this.favorites = this.favorites.filter((item)=>{
          return item._id !== id;
        })
        console.log("Deleted");
        this.toaster.info('Removed successfully.', 'Removed');
      },
      error: (err: any)=>{
        console.log(err);
        console.log("ERRORRRR");
      }
    });
  }


  toggleWatched(id: string){
    this.favoriteService.toggleWatched(id).subscribe({
      next: (res:any)=>{
        console.log(res);
        let item = this.favorites.find((mediaItem)=>mediaItem._id === id);
        if (item?.media) {
          item.media.isWatched = !item.media.isWatched;
        }
      },
      error: (err:any)=>{
        console.log(err);
      }
    });
  }
}
