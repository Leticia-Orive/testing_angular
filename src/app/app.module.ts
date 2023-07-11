import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnakecasePipe } from './shared/snakecase.pipe';
import { FormatMediumDatePipe } from './shared/format-medium-date.pipe';
import { CustomColorDirective } from './shared/custom-color.directive';
import { BookService } from './books/service/book.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [BookService],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
