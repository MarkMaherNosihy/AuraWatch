import { Component, Input } from '@angular/core';
import { RatingComponent } from "../../rating/rating.component";

@Component({
  selector: 'app-recommendations-card',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './recommendations-card.component.html',
  styleUrl: './recommendations-card.component.scss'
})
export class RecommendationsCardComponent {

  @Input() mediaRating!: number;
  @Input() previewImageUrl!: string;
  @Input() mediaName!: string;
}
