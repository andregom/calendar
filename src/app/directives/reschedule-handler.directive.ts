import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { MatOption } from '@angular/material/core'
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[handleRescheduling]'
})

export class RescheduleHandler {
    @Input() isSelectingSub: BehaviorSubject<boolean> | undefined;
    @Input() selected: BehaviorSubject<Set<number>> | undefined;
    @Input() cannotBeSelected: BehaviorSubject<Set<number>> | undefined;

    @Output() addToSelection: EventEmitter<number> = new EventEmitter();
    @Output() removeFromSelection: EventEmitter<number> = new EventEmitter();
    @Output() startNewSelection: EventEmitter<number> = new EventEmitter();

    constructor(
        private matOption: MatOption,
    ) {
        this.selected = new BehaviorSubject(new Set());
    }

    ngOnInit() {
        this.cannotBeSelected?.subscribe(value => {
            const isBooked = value && this.cannotBeSelected?.value.has(this.matOption.value);
            if (isBooked) {
                this.matOption._getHostElement().textContent = "Booked"
            }
        })

        this.selected?.subscribe(value => {
            const isSelectable = value && value.has(this.matOption.value) && !this.cannotBeSelected?.value.has(this.matOption.value);
            if (isSelectable) {
                this.toggleSelect();
            } else {
                this.toggleDeselect();
            }
        })
    }

    toggleSelect() {
        this.matOption.disabled = false;
        this.matOption.select();
    }

    toggleDeselect() {
        this.matOption.disabled = true;
        this.matOption.deselect();
    }

}