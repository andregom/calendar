import { AfterContentInit, AfterViewChecked, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatCalendar, MatCalendarCell } from '@angular/material/datepicker';
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
  }

  ngAfterViewChecked(): void {
    for (let index in this.matCalendar.monthSelected) {

    }
    let HeaderElsClass = this.elRef.nativeElement.getElementsByClassName('mat-calendar-body-cell')
    // let HeaderElsClass: MatCalendarCell<Date>[][] = this.matCalendar.monthView._matCalendarBody.rows;
    let orderDate = Array.from(this.selectedDates.value);
    // console.log(this.selectedDates.value);
    // tempOrderDate is epoch array, i convert from epoch to date

    for (let index in HeaderElsClass) {
      if(typeof HeaderElsClass[index] === 'object') {
        let headerClass = HeaderElsClass;

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
