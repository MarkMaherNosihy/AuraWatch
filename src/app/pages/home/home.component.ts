import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SegmentedControlComponent } from "../../components/segmented-control/segmented-control.component";
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from "../../components/media-card/media-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SegmentedControlComponent, CommonModule, MediaCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isInputFocused = false;
  selectedMediaFilter: string = 'All';
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
