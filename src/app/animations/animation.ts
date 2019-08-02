import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

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

export const avatarValidationMessage = [
  trigger('animatedMessage', [
    transition(':enter', [
      style({ transform: 'translateY(100%)', 'background-color': 'transparent', border: 'none'}),
      animate('2s ease', keyframes([
        style({ transform: 'translateY(0)', offset: 0.4 }),
        style({ border: '1px solid red', offset: 0.5 }),
        style({ 'background-color': '#fafafaab', offset: 0.8 })
      ]))
    ]),
    transition(':leave', [
      animate('1s ease', keyframes([
        style({ 'background-color': 'transparent', offset: 0.7 }),
        style({ 'font-size': '0.75rem', offset: 0.8 }),
        style({ opacity: 0 , offset: 0.9}),
      ]))
    ])
  ])
];
