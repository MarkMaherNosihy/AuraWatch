import { Component } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Toast } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: '[app-danger-toast]',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'danger-toast.component.html',
  styleUrl: 'danger-toast.component.scss',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class DangerToast extends Toast {
  
}
