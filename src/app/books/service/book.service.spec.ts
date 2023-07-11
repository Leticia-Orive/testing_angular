import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookService } from './book.service';

import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of books', () => {
    const mockBooks = [
      { id: 1, title: 'Book 1' },
      { id: 2, title: 'Book 2' },
    ];

    const books = service.getBooks();
    expect(books).toEqual(mockBooks);

    const req = httpMock.expectOne('https://localhost:4200/books');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  // Add more tests as needed
});
