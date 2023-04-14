import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appDateSelectioHandler]'
})
export class DateSelectioHandlerDirective implements OnInit {
  @Output() selectDay: EventEmitter<number> = new EventEmitter();

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
    console.table(this.elementRef.nativeElement)
  }
  
  
  
  @HostListener('click')
  click() {
    const selecteDate = this.matCalendar.activeDate;
    this.selectDay.emit(selecteDate.getDate());
  }

}
