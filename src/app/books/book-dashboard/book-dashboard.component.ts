import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import {IBook} from "../book.model";

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {

  author1Books: IBook[] = [];
  author2Books: IBook[] = [];
  author3Books: IBook[] = [];

  constructor(protected bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBooksByAuthors();
  }

  private fetchBooksByAuthors() {
    this.bookService.findAllByAuthor("author1").subscribe({
      next: value => this.author1Books = value.body ?? [],
    });
    this.bookService.findAllByAuthor("author2").subscribe({
      next: value => this.author2Books = value.body ?? [],
    });
    this.bookService.findAllByAuthor("author3").subscribe({
      next: value => this.author3Books = value.body ?? [],
    });
  }
}
