import { AfterContentInit, AfterViewChecked, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
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
    private renderer: Renderer2
  ) {
    this.selectedDates = new BehaviorSubject(new Set());
    this.selectedDays = new BehaviorSubject(new Set());
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    console.table(this.matCalendar.monthView._matCalendarBody.activeCell);
  }
}
