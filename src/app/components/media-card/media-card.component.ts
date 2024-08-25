import { Component, Input } from '@angular/core';
import { RatingComponent } from "../rating/rating.component";

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  @Input() mediaRating!: number;
  @Input() previewImageUrl!: string;
  @Input() mediaName!: string;

}
