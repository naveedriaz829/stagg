import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideInOutAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      style({ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 1 }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(100%)' }),
          animate('500ms ease-in-out', style({ transform: 'translateY(0)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ position: 'relative' }),
          animate('800ms ease-in', style({ opacity: 0 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
