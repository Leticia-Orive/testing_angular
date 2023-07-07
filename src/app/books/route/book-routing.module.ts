import { BookListComponent } from "../book-list/book-list.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BookViewComponent} from "../book-view/book-view.component";
import {BookEditComponent} from "../book-edit/book-edit.component";
import { BookDashboardComponent } from "../book-dashboard/book-dashboard.component";


export const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: ':id/view',
    component: BookViewComponent
  },
  {
    path: ':id/edit',
    component: BookEditComponent
  },
  {
    path: 'new',
    component: BookEditComponent
  },
  {
    path: 'dashboard',
    component: BookDashboardComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
