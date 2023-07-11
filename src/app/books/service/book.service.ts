import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  IBook,
  NewBook,
  PartialUpdateBook,
  RestBook,
  RestOfBook,
} from '../book.model';
import dayjs from 'dayjs/esm';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // SUT

  readonly apiUrl = 'http://localhost:8080/api/books';
  private books: IBook[] = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
  ];

  getBooks(): IBook[] {
    return this.books;
  }

  constructor(private http: HttpClient) {} // Dependencias

  findAll(): Observable<HttpResponse<IBook[]>> {
    return this.http
      .get<RestBook[]>(this.apiUrl, { observe: 'response' })
      .pipe(map((response) => this.convertResponseArrayFromServer(response)));
  }
  findAllByAuthor(author: string): Observable<HttpResponse<IBook[]>> {
    return this.http
      .get<RestBook[]>(`${this.apiUrl}/author/${author}`, {
        observe: 'response',
      })
      .pipe(map((response) => this.convertResponseArrayFromServer(response)));
  }
  findById(id: number): Observable<HttpResponse<IBook>> {
    return this.http
      .get<RestBook>(`${this.apiUrl}/${id}`, { observe: 'response' })
      .pipe(map((response) => this.convertResponseFromServer(response)));
  }
  create(book: NewBook): Observable<HttpResponse<IBook>> {
    const bookDTO = this.convertDateFromClient(book);
    return this.http
      .post<RestBook>(this.apiUrl, bookDTO, { observe: 'response' })
      .pipe(map((response) => this.convertResponseFromServer(response)));
  }
  update(book: IBook): Observable<HttpResponse<IBook>> {
    const bookDTO = this.convertDateFromClient(book);
    return this.http
      .put<RestBook>(this.apiUrl, bookDTO, { observe: 'response' })
      .pipe(map((response) => this.convertResponseFromServer(response)));
  }
  partialUpdate(book: PartialUpdateBook): Observable<HttpResponse<IBook>> {
    const bookDTO = this.convertDateFromClient(book);
    return this.http
      .put<RestBook>(this.apiUrl, bookDTO, { observe: 'response' })
      .pipe(map((response) => this.convertResponseFromServer(response)));
  }
  deleteById(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

  // funciones para transformaciones de string a dayjs

  private convertResponseArrayFromServer(
    response: HttpResponse<RestBook[]>
  ): HttpResponse<IBook[]> {
    return response.clone({
      body: response.body
        ? response.body.map((restBook) => this.convertDateFromServer(restBook))
        : null,
    });
  }

  private convertResponseFromServer(
    response: HttpResponse<RestBook>
  ): HttpResponse<IBook> {
    return response.clone({
      body: response.body ? this.convertDateFromServer(response.body) : null,
    });
  }
  private convertDateFromServer(book: RestBook): IBook {
    return {
      ...book,
      released: book.released ? dayjs(book.released) : undefined,
    };
  }

  private convertDateFromClient<T extends IBook | NewBook | PartialUpdateBook>(
    book: T
  ): RestOfBook<T> {
    return {
      ...book,
      released: book.released?.format('YYYY-MM-DD') ?? null,
    };
  }
}
