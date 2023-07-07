import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BookListComponent} from "./books/book-list/book-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule)},
  // {path: 'books/:id/view', component: BookListComponent},
  // {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule{


}
