import { Component, OnInit } from '@angular/core';
import {BookService} from "../service/book.service";
import {IBook} from "../book.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  dataSource: IBook[] = [];
  displayedColumns: string[] = ['id', 'title', 'author', 'year', 'isPublished', 'released', 'actions'];
  titleError: boolean = false;
  yearNotValid: boolean = false;

  constructor(protected bookService: BookService,
              protected router: Router, // routing
              protected snackbar: MatSnackBar) { }

  ngOnInit(): void {
    console.log('entering BookListComponent!');
    this.fetchBooks();
  }

  private fetchBooks() {
    this.bookService.findAll().subscribe({
      next: resp => {
        console.log(resp);
        this.dataSource = resp.body ?? [];
      },
      error: error => this.showError('Error fetching books')

    });
  }

  onEdit(book: IBook) {
    console.log("onEdit!");
    this.router.navigate(['/books', book.id, 'edit']);
  }

  onDelete(book: IBook) {
    console.log("onDelete!");
    this.bookService.deleteById(book.id).subscribe({
      next: response => {
        if (response.status === 204) this.fetchBooks();
        else this.showError('Error deleting book')
      },
      error: error => this.showError('Error deleting books')
    });
  }

  private showErrorWithDuration(message: string, duration: number) {
    this.snackbar.open(message, 'Close', {duration: duration});
  }
  private showError(message: string) {
    this.snackbar.open(message, 'Close');
  }
}
