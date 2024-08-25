import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss'
})
export class SegmentedControlComponent {
  @Output() mediaChanged = new EventEmitter<string>();
  segments: any[] = [
    {
      name: 'All',
      isActive: true
    },
    {
      name: 'Movies',
      isActive: false
    },
    {
      name: 'TV Shows',
      isActive: false
    }
  ]

  setActive(segment: any){
    this.segments.forEach((seg)=>seg.isActive = false);
    segment.isActive = true;
    this.mediaChanged.emit(segment.name);
  }
}
