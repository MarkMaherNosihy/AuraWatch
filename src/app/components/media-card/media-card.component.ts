import { Component, inject, Input } from '@angular/core';
import { RatingComponent } from "../rating/rating.component";
import { HeartComponent } from "../heart/heart.component";
import { FavoriteService } from '../../services/favorite.service';
import { Media } from '../../models/media.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [RatingComponent, HeartComponent],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  @Input() media!: Media;
  @Input() isFavorite!: boolean;
  @Input() isWatched!: boolean;
  favService = inject(FavoriteService);
  toaster = inject(ToastrService);
  private auth = inject(AuthService);
  private router = inject(Router);
  addToFavorite(event: Event){

    event.stopPropagation();
    
    if(!this.auth.isAuthenticated()){
      this.toaster.info("You need to be logged in.")
      this.router.navigateByUrl('login');
      return;
    }

    if(this.isFavorite){
      this.toaster.info("Already added to favorites");
      return;
    }
      this.favService.addToFav(this.media).subscribe({
        next: (res:any)=>{
          this.toaster.info("Added to favorites");
          this.isFavorite=true;
        },
        error: (err:any)=>{
          this.toaster.info("An Error has occured.")
        }
      });
  }


}
