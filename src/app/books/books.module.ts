import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {BookRoutingModule} from "./route/book-routing.module";
import {MatButtonModule} from "@angular/material/button";
import { BookViewComponent } from './book-view/book-view.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import { SnakecasePipe } from '../shared/snakecase.pipe';
import { FormatMediumDatePipe } from '../shared/format-medium-date.pipe';
import { BookDeleteDialog } from './book-delete-dialog/book-delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AppModule} from "../app.module";
import { CustomColorDirective } from '../shared/custom-color.directive';
import {MatFormFieldModule} from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { BookDashboardListComponent } from './book-dashboard-list/book-dashboard-list.component';
import { BookDashboardListItemComponent } from './book-dashboard-list-item/book-dashboard-list-item.component';
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [
    BookListComponent,
    BookViewComponent,
    BookEditComponent,
    SnakecasePipe,
    FormatMediumDatePipe,
    BookDeleteDialog,
    CustomColorDirective,
    BookDashboardComponent,
    BookDashboardListComponent,
    BookDashboardListItemComponent
  ],
  imports: [
    BookRoutingModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}

  ]
})
export class BooksModule { }
