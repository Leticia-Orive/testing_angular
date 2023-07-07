import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { IBook } from '../book.model';
import { BookService } from '../service/book.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BookDeleteDialog} from "../book-delete-dialog/book-delete-dialog.component";

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  book: IBook | undefined;
  error: string | undefined;

  constructor(protected activatedRoute: ActivatedRoute, // routed
              protected router: Router, // routing
              protected service: BookService,
              protected dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('Init BookViewComponent');

    this.activatedRoute.paramMap.subscribe({
      next: pmap => this.fetchBook(pmap.get('id')),
      error: error => this.error = 'Error obtaining id'
    });

    // const id = this.activatedRoute.snapshot.params['id'];
    // const id = this.activatedRoute.snapshot.paramMap.get("id");

    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log(params);
    //   console.log(params['sort']);
    // });
  }


  private fetchBook(id: string | number | null) {
    if(!id){
      this.error = 'Error obtaining id';
      return;
    }

    if(typeof id === 'string'){
      id = parseInt(id, 10);
    }

    this.service.findById(id).subscribe({
      next: response => {
        console.log(response);
        if(response.body) this.book = response.body
        else this.error = 'Book not found'
      },
      error: error => this.error = 'Error fetching book'

    });
  }
  onDelete(book: IBook) {
    console.log("onDelete!");

    const config = new MatDialogConfig();
    config.id = 'delete-dialog';
    config.autoFocus = true;
    config.data = book;
    config.disableClose = true;

    const dialogRef = this.dialog.open(BookDeleteDialog, config);
    dialogRef.afterClosed().subscribe(deleted => {
      if(deleted) this.navigateToList()
    });

    // this.service.deleteById(book.id).subscribe({
    //   next: response => {
    //     if (response.status === 204) this.navigateToList();
    //     else this.error = 'Error deleting book'
    //   },
    //   error: error => this.error = 'Error deleting book'
    // });
  }


  private navigateToList() {
    this.router.navigate(['/books']);
  }
}
