import dayjs from 'dayjs/esm'

export interface IBook {
  id: number,
  title?: string | null,
  author?: string | null,
  year?: number | null,
  isPublished?: boolean | null
  released?: dayjs.Dayjs | null;
}

// utility types

export type NewBook = Omit<IBook, 'id'> & {id: null};

export type PartialUpdateBook = Partial<IBook> & Pick<IBook, 'id'>

// REST
export type RestOfBook<T extends IBook | NewBook> = Omit<T, 'released'> & {
  released?: string | null
}

export type RestBook = RestOfBook<IBook>

export type RestNewBook = RestOfBook<NewBook>


