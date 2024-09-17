import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { Media, MediaItem } from '../models/media.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  api = inject(ApiService);

  constructor() { }

  addToFav(body: Media){
    return this.api.postAuth<Media>('api/favorites','',{media: body});
  }

  getAllFav(){
    return this.api.getAuth<MediaItem[]>('api/favorites','');
  }
  deleteFavById(id: string){
    return this.api.delete(`api/favorites/${id}`, '')
  }
  toggleWatched(id: string){
    return this.api.patchAuth(`api/favorites/${id}`, '');
  }
}
