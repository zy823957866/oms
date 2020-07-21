import { trigger, transition, style, animate, state } from '@angular/animations';

export const toggleAnimation = trigger('slideInOut', [
    state('inactive', style({
        right: '-600px'
    })),
    state('active', style({
        right: '0px'
    })),
    transition('inactive => active', animate('200ms ease-out')),
    transition('active => inactive', animate('200ms ease-in'))
]);