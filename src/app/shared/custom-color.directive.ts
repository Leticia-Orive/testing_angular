import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})
export class CustomColorDirective implements OnChanges{

  defaultFontColor = 'rgb(0, 0, 0)'

  @Input('appCustomColor')
  fontColor = '';

  constructor(private element: ElementRef) {
    element.nativeElement.style.border = '2px solid red';
  }

  ngOnChanges(): void {
    this.element.nativeElement.style.color = this.fontColor || this.defaultFontColor
  }



}
