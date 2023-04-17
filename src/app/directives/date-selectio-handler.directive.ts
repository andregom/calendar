import { AfterViewChecked, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appDateSelectioHandler]'
})
export class DateSelectioHandlerDirective implements AfterViewChecked {

  @Input() selectedDates: BehaviorSubject<Set<Date>>;
  @Input() selectedDays: BehaviorSubject<Set<number>>;

  constructor(
    private matCalendar: MatCalendar<Date>,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.selectedDates = new BehaviorSubject<Set<Date>>(new Set());
    this.selectedDays = new BehaviorSubject(new Set());
  }

  ngAfterViewChecked(): void {

    const HeaderElsClass = this.elRef.nativeElement.getElementsByClassName('mat-calendar-body-cell')
    const orderDate = Array.from(this.selectedDates.value);

    for (const index in HeaderElsClass) {
      if(typeof HeaderElsClass[index] === 'object') {
        const headerClass = HeaderElsClass;

        orderDate.find(each => {
          each.getDate(), headerClass[index].children[0].textContent;
          if (each.getDate() === headerClass[index].value) {
            this.renderer.addClass(HeaderElsClass, 'mat-calendar-body-active');
            this.renderer.setStyle(HeaderElsClass, 'font-weight', '900');
          }
          return false;
        })
      }
    }
  }
}
