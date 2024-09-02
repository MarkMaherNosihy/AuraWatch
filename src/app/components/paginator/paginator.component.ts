import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages!: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  changePage(newPage: number){
    this.currentPage = newPage;
    this.pageChanged.emit(newPage);
  }
}
