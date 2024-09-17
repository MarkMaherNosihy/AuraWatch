import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-heart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heart.component.html',
  styleUrl: './heart.component.scss'
})
export class HeartComponent {
  isHovered: boolean = false;
  isClicked: boolean = false;
  @Input() isFavorite: boolean = false;

  get heartClass() {
    return this.isFavorite || this.isClicked || this.isHovered ? 'bi bi-heart-fill heart' : 'bi bi-heart heart';
  }
  onClick(){
      this.isClicked=true;
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }
}
