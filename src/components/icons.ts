/**
 * Icon path data, kept in a plain module so the type can be imported from
 * anywhere without pulling in the component.
 *
 * Every icon is drawn on a 24×24 grid as a single path, stroked with
 * `currentColor`, so it inherits colour and stays crisp at any size with no
 * extra network request — which matters on the connections many of our
 * students are browsing from.
 */
export const iconPaths = {
  emblem:
    'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9',
  pillar: 'M12 3 3 7.5V9h18V7.5L12 3zM5.5 11v7M9.8 11v7M14.2 11v7M18.5 11v7M3 21h18',
  people:
    'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7M22 19v-1a4 4 0 0 0-3-3.87M16 3.73a4 4 0 0 1 0 7.75',
  document: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
  ledger:
    'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 2v20M11 8h6M11 12h6M11 16h4',
  bank: 'M2 8h20v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 12h20M6 17h4M2 8l10-5 10 5',
  shield: 'M12 22s8-4 8-10V5.2L12 2 4 5.2V12c0 6 8 10 8 10zM9 11.8l2.1 2.2L15 10',
  badge: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.4 13.6 7 22l5-2.6L17 22l-1.4-8.4',
  star: 'M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3L7.3 14 2.6 9.6l6.5-.9z',
  wings:
    'M10.2 2.6a1.8 1.8 0 0 1 3.6 0V9l8 4.5v2.4l-8-2.3v4.3l2.5 1.9v1.6L12 20.1l-4.3 1.3v-1.6l2.5-1.9v-4.3l-8 2.3v-2.4L10.2 9z',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.2V12l3.2 2',
  calendar: 'M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
  rupee: 'M6.5 3h11M6.5 8h11M6.5 13h4.3a5 5 0 0 0 0-10M6.5 13 15 21',
  graduation: 'M22 10 12 5 2 10l10 5zM6 12v4.6c0 1.3 2.7 2.6 6 2.6s6-1.3 6-2.6V12M20 10.8v5.2',
  book: 'M12 7.3v13.4M12 7.3A5.3 5.3 0 0 0 6.7 2H3v14.4h4.4A4.6 4.6 0 0 1 12 20.7a4.6 4.6 0 0 1 4.6-4.3H21V2h-3.7A5.3 5.3 0 0 0 12 7.3z',
  board: 'M2 4h20M4 4v11h16V4M12 15v4M8.8 21.2 12 19l3.2 2.2M8.6 9.8l1.9 1.9-1.9 1.9M13 13.6h2.6',
  clipboard:
    'M9 3h6a1 1 0 0 1 1 1v1.5H8V4a1 1 0 0 1 1-1zM16 5h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2M8.8 13.6l2.2 2.2 4.2-4.4',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.8 8.2l-2.1 5.5-5.5 2.1 2.1-5.5z',
  heart: 'M12 20.7 4.3 13a5.1 5.1 0 0 1 7.2-7.2l.5.5.5-.5A5.1 5.1 0 0 1 19.7 13z',
  users: 'M17 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20M9.5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8M22 20v-1.5a4 4 0 0 0-3-3.9',
  'arrow-right': 'M4.5 12h15M13.5 6l6 6-6 6',
  'map-pin':
    'M20 10.3c0 5.9-8 11.7-8 11.7s-8-5.8-8-11.7a8 8 0 0 1 16 0zM12 13a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z',
  mail: 'M4 4.5h16a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 18V6A1.5 1.5 0 0 1 4 4.5zM2.8 6.2 12 13l9.2-6.8',
  phone:
    'M21.5 16.9v2.8a1.9 1.9 0 0 1-2.1 1.9 18.9 18.9 0 0 1-8.2-2.9 18.6 18.6 0 0 1-5.7-5.7A18.9 18.9 0 0 1 2.6 4.7 1.9 1.9 0 0 1 4.5 2.6h2.8a1.9 1.9 0 0 1 1.9 1.6c.12.9.34 1.8.66 2.7a1.9 1.9 0 0 1-.43 2L8.2 10.1a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.43c.86.32 1.77.54 2.7.66a1.9 1.9 0 0 1 1.6 1.9z',
  check: 'M20 6.5 9.2 17.3 4 12.1',
  'check-circle': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.2 12.2l2.6 2.6 5-5.2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6.5 6.5l11 11M17.5 6.5l-11 11',
  alert: 'M12 3.2 1.8 20.8h20.4zM12 9.5v4.6M12 17.4h.01',
} as const;

export type IconName = keyof typeof iconPaths;
