import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

export const trasitedCardsAnimation = [
  trigger('classTransited', [
    state('true', style({
      display: 'none'
    })),
    transition('* => true', [
      animate('1500ms ease-in',
        keyframes([
          style({
            'background-color': '#5fb663', offset: 0
          }),
          style({transform: 'translateX(200%)', offset: 0.9
        })
        ]))
    ])
  ])
];

export const inOutCardsAnimation = [
  trigger('showTitle', [
    state('void', style({transform: 'translateY(-50px)', opacity: 0})),
    state('*', style({transform: 'translateY(0px)', opacity: 1})),
    transition(':enter, :leave', animate(200))
  ]),
  trigger('insertRemoveCard', [
    transition('* <=> *', [
      query(':leave', [
        stagger(50, [
          animate(100, style({transform: 'translateY(-50px)', opacity: 0}))
        ])
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 }),
        stagger(100, [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          animate(200, style({ transform: 'translateY(0px)', opacity: 1 }))
        ])
      ], { optional: true })
    ])
  ])
];

