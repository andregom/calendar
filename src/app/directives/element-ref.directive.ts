import { Directive, ElementRef, Input } from '@angular/core'
import { MatOption } from '@angular/material/core'
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[elementRef]'
})

export class ElementReference {
    @Input() selection: Set<number> | undefined;
    @Input() selectedHoursSub: BehaviorSubject<Set<number>> | undefined;

    constructor(private matOption: MatOption) {
        this.selection = new Set();
    }

    ngOnInit() {
        if (this.selection &&  this.selection.has(this.matOption.value)) {
            this.matOption.select();
        }

        this.selectedHoursSub?.subscribe(value => {
            if (value &&  value.has(this.matOption.value)) {
                this.matOption.select();
            } else {
                this.matOption.deselect();
            }
        })
    }


}