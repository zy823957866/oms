
import { animate, state, style, transition, trigger, group, query, animateChild } from '@angular/animations';

// 路由动画
export const routeAnimation =
    trigger('routeAnimation', [
        state('*',
            style({
                width: 'calc(100% - 48px)',
                height: 'calc(100% - 48px)',
                opacity: 1,
                display: 'block',
                position: 'absolute'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0
            }),
            animate('0.5s ease-in')
        ]),
        transition(':leave', [
            animate('0.2s ease-out', style({
                opacity: 0
            }))])
    ]);