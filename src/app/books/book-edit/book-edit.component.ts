import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../service/book.service';
import {IBook, NewBook} from "../book.model";
import {finalize, Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import dayjs from "dayjs/esm";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  editForm = this.createFormGroup();
  error: string | undefined;
  success = false;
  isSaving = false;

  constructor(protected service: BookService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next: pmap => {
        if (pmap.get('id')) {
          console.log("Actualización!");
          this.fetchBook(pmap.get('id'));
        } else {
          console.log("Creación!");
        }
      }
    })
  }

  createFormGroup() {
    return new FormGroup({
      id: new FormControl(
        {value: '', disabled: true},
        {}
      ),
      title: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(10), Validators.maxLength(50)]
        }
      ),
      author: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(10), Validators.maxLength(50)]
        }
      ),
      year: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required]
        }
      ),
      isPublished: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required]
        }
      ),
      released: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required]
        }
      )
    })
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
        if(response.body) this.updateForm(response.body)
        else this.error = 'Book not found'
      },
      error: error => this.error = 'Error fetching book'

    });
  }

  private updateForm(book: IBook):void {
    this.editForm.reset({
      id: {value: book.id, disabled: true},
      title: book.title,
      author: book.author,
      year: book.year,
      isPublished: book.isPublished ? 'true' : 'false',
      released: book.released?.format('YYYY-MM-DD')
    } as any)
  }

  save() {
    this.isSaving = true; // iniciamos proceso de guardado
    const book = this.extractBookFromForm();
    if (book.id){
      console.log("Actualizando libro");
      this.suscribeToSaveResponse(this.service.update(book as IBook));
    }else{
      console.log("Creando nuevo libro");
      this.suscribeToSaveResponse(this.service.create(book as NewBook));
    }
  }

  private extractBookFromForm(): IBook | NewBook {

    return {
      id: this.editForm.get(['id'])?.value ?? null,
      title: this.editForm.get(['title'])!.value,
      author: this.editForm.get(['author'])!.value,
      year: this.editForm.get(['year'])!.value,
      isPublished: this.editForm.get(['isPublished'])!.value === "true",
      released: dayjs(this.editForm.get(['released'])!.value, {}, 'en')
    } as IBook | NewBook;
  }

  private suscribeToSaveResponse(result: Observable<HttpResponse<IBook>>) {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (resp) => this.onSaveSuccess(resp),
      error: (resp) => this.onSaveError(resp),
    })
  }

  private onSaveFinalize() {
    console.log("onSaveFinalize")
    this.isSaving = false;
  }

  private onSaveSuccess(resp: HttpResponse<IBook>) {
    console.log("onSaveSuccess")
    this.success = true;
  }

  private onSaveError(resp: HttpResponse<IBook>) {
    console.log(resp);
    this.error = `Error with backend`;
  }
}
