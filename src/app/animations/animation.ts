import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

export const enterFromTop = [
  trigger('enterFromTop', [
    state('void', style({transform: 'translateY(-50px)', opacity: 0})),
    state('*', style({transform: 'translateY(0px)', opacity: 1})),
    transition(':enter, :leave', animate(200))])
  ];

export function multiEnterFromBottom(selector?: string) {
  return trigger('multiEnterFromBottom', [
    transition('* <=> *', [
      query(selector ? `${selector}:leave` : ':leave', [
        stagger(50, [
          animate(100, style({transform: 'translateY(-50px)', opacity: 0}))
        ])
      ], { optional: true }),
      query(selector ? `${selector}:enter` : ':enter', [
        style({ opacity: 0 }),
        stagger(100, [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          animate(200, style({ transform: 'translateY(0px)', opacity: 1 }))
        ])
      ], { optional: true })
    ])
  ]);
}
