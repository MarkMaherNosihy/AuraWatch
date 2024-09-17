import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit {

  @Input() currentPage: number = 1;
  @Input() totalPages: number= 500;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  maxPageToNavigate: number = 4;

  ngOnInit(): void {
    if(window.innerWidth < 560){
      this.maxPageToNavigate = 3;
    }
  }
  get pages(): number[] {
    const startPage = Math.max(1, this.currentPage - this.maxPageToNavigate); // Don't go below page 1
    const endPage = Math.min(this.totalPages, this.currentPage + this.maxPageToNavigate); // Don't go above total pages
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  // HostListener to detect window resize and adjust maxPageToNavigate
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if(windowWidth <= 560){
      this.maxPageToNavigate = 2;
    }else{
      this.maxPageToNavigate = 4;
    }
  }
  changePage(newPage: number){
    this.currentPage = newPage;
    this.pageChanged.emit(newPage);
  }
}
