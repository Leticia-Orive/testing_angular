import { Pipe, PipeTransform } from '@angular/core';

/*

El poder del ahora
el_poder_del_ahora
 */
@Pipe({
  name: 'snakecase'
})
export class SnakecasePipe implements PipeTransform {

  transform(input: string | null | undefined): string {
    if(input === null || input === undefined)
      return '';

    return input.length === 0 ? '' : input.split(' ').join('_').toLowerCase();
  }

}
