import {Component, Input, OnInit} from '@angular/core';
import { IBook } from '../book.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-dashboard-list',
  templateUrl: './book-dashboard-list.component.html',
  styleUrls: ['./book-dashboard-list.component.css']
})
export class BookDashboardListComponent implements OnInit {

  @Input()
  books: IBook[] = [];

  constructor(protected router: Router) { }

  ngOnInit(): void {
  }

  viewBook(book: IBook) {
    this.router.navigateByUrl(`/books/${book.id}/view`);
  }
}
