import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IBook} from "../book.model";
import {BookService} from "../service/book.service";
import {tap} from "rxjs";

/*
Crear un spec exclusivo para probar el Dialog
 */
@Component({
  selector: 'app-book-delete-dialog',
  templateUrl: './book-delete-dialog.component.html'
})
export class BookDeleteDialog {
  book: IBook;

  constructor(private dialogRef: MatDialogRef<BookDeleteDialog>,
              @Inject(MAT_DIALOG_DATA) public data: IBook,
              protected service: BookService) {
    this.book = data;
  }

  close(){
    this.dialogRef.close(false);
  }

  confirmDelete() {
    this.service.deleteById(this.book.id).pipe(
      tap(() => this.dialogRef.close(true))
    ).subscribe();
  }
}
