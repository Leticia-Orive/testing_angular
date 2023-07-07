import { Pipe, PipeTransform } from '@angular/core';
import dayjs from "dayjs/esm";

@Pipe({
  name: 'formatMediumDate'
})
export class FormatMediumDatePipe implements PipeTransform {

  transform(date: dayjs.Dayjs | null | undefined): string {
    return date ? date.format('DD/MM/YYYY') : '';
  }

}
