// constants.ts

export const WIOSNA_START_MONTH = 2; // marzec

export interface LinkGroup {
  name: string;
  show?: boolean;
  type?: string;
  links?: SingleLink[];
  text?: string;
  protected?: boolean;
  image?: string;
  fullscreen?: boolean;
  url?: string;
}

export interface SingleLink {
  url?: string;
  type?: string;
  label?: string;
  fullscreen?: boolean;
  image?: string;
  name?: string;
  show?: boolean;
  links?: SingleLink[];
  text?: string;
  hidden?: boolean;
}

export interface Meeting {
  date: string;
  show: boolean;
  links?: LinkGroup[];
  meetings?: Meeting[];
}

export interface Item {
  title: string;
  show: boolean;
  image?: string;
  fullscreen?: boolean;
  links?: LinkGroup[];
  meetings?: Meeting[];
}
export const WIOSNA_START_DAY = 22; // 22 marca
export const WIOSNA_STOP_MONTH = 4; // maj
export const WIOSNA_STOP_DAY = 3;   // 3 maja

export const ZIMA_START_MONTH = 10; // listopad
export const ZIMA_START_DAY = 5;    // 5 listopada
export const ZIMA_STOP_MONTH = 11;  // grudzień
export const ZIMA_STOP_DAY = 8;     // 8 grudnia

export function getWiosnaStart(year: number): Date {
  return new Date(year, WIOSNA_START_MONTH, WIOSNA_START_DAY);
}
export function getWiosnaStop(year: number): Date {
  return new Date(year, WIOSNA_STOP_MONTH, WIOSNA_STOP_DAY);
}
export function getZimaStart(year: number): Date {
  return new Date(year, ZIMA_START_MONTH, ZIMA_START_DAY);
}
export function getZimaStop(year: number): Date {
  return new Date(year, ZIMA_STOP_MONTH, ZIMA_STOP_DAY);
}
