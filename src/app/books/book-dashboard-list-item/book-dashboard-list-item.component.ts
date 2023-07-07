import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IBook } from '../book.model';

@Component({
  selector: 'app-book-dashboard-list-item',
  templateUrl: './book-dashboard-list-item.component.html',
  styleUrls: ['./book-dashboard-list-item.component.css']
})
export class BookDashboardListItemComponent implements OnInit {

  @Input()
  book!: IBook;

  @Output()
  selected = new EventEmitter<IBook>();

  constructor() { }

  ngOnInit(): void {
  }

  view(){
    console.log("view");
    this.selected.emit(this.book);
  }

}
