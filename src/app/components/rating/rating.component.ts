import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {
  @Input() rating!: number;

  ngOnInit(): void {
    this.rating = parseFloat(this.rating.toFixed(2));

  }
}
