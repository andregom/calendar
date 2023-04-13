import { Directive, HostListener, Input } from '@angular/core'
import { MatOption } from '@angular/material/core'
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[elementRef]'
})

export class SelectionHandler {
    @Input() isSelectingSub: BehaviorSubject<boolean> | undefined;
    @Input() selection: Set<number> | undefined;
    @Input() selectedSub: BehaviorSubject<Set<number>> | undefined;

    constructor(private matOption: MatOption) {
        this.selection = new Set();
    }

    ngOnInit() {
        if (this.selection && this.selection.has(this.matOption.value)) {
            this.matOption.select();
        }

        // this.selectedSub?.subscribe(value => {
        //     if (value && value.has(this.matOption.value)) {
        //         this.matOption.select();
        //     } else {
        //         this.matOption.deselect();
        //     }
        // })
    }

    select() {
        this.matOption.disabled = false;
        this.matOption.select();
    }

    deselect() {
        this.matOption.disabled = true;
        this.matOption.deselect();
    }

    @HostListener('mousedown')
    mousedown() {
        if (!this.matOption.selected) {
            this.select();
        }
        else {
            this.deselect();
        }
    }

    //continue selection with mousedown
    @HostListener('mouseover')
    mouseover() {
        if (this.isSelectingSub?.value) {
            this.select()
        } else {
            this.matOption.disabled = false;
        }
    }
    
    @HostListener('mouseleave')
    mouseleave() {
        if (!this.matOption.selected)
            this.matOption.disabled = true;
    }

    // @HostListener('mouseout')
    // isItSafe() {
    //     console.log("It really left rigth");
    // }
    // @HostListener('mouseout')
    // messageInput() {
    //     console.log(`The message input is ${this.message}`);
    // }

}
