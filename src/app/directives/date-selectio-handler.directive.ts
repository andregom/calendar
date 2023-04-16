import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appDateSelectioHandler]'
})
export class DateSelectioHandlerDirective implements OnInit {

  @Input() selectedDates: BehaviorSubject<Set<Date>>;
  @Input() selectedDays: BehaviorSubject<Set<number>>;

  constructor(
    private matCalendar: MatCalendar<Date>,
    private elementRef: ElementRef
  ) {
    this.selectedDates = new BehaviorSubject(new Set());
    this.selectedDays = new BehaviorSubject(new Set());
  }

  ngOnInit(): void {

  }

}
