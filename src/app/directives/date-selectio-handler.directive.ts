import { AfterViewChecked, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appDateSelectioHandler]'
})
export class DateSelectioHandlerDirective implements OnInit, AfterViewChecked {

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

  ngOnInit(): void {
    //TODO
  }

  ngAfterViewChecked(): void {
    for (const index in this.matCalendar.monthSelected) {

    }
    const HeaderElsClass = this.elRef.nativeElement.getElementsByClassName('mat-calendar-body-cell')
    // let HeaderElsClass: MatCalendarCell<Date>[][] = this.matCalendar.monthView._matCalendarBody.rows;
    const orderDate = Array.from(this.selectedDates.value);
    // console.log(this.selectedDates.value);
    // tempOrderDate is epoch array, i convert from epoch to date

    for (const index in HeaderElsClass) {
      if(typeof HeaderElsClass[index] === 'object') {
        const headerClass = HeaderElsClass;

        orderDate.find(each => {
          console.log(each.getDate(), headerClass[index].children[0].textContent);
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
