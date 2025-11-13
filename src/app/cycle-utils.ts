// cycle-utils.ts

export function getDaysToEnd(currentDateTime: Date | null): string {
  const today = currentDateTime ?? new Date();
  today.setHours(0,0,0,0);
  const year = today.getMonth() > 10 ? today.getFullYear() + 1 : today.getFullYear();
  const marzec20 = new Date(year, 2, 20); // 20 marca
  const maj10 = new Date(year, 4, 10); // 10 maja
  let target: Date;
  let targetLabel: string;
  if (today > marzec20 && today < maj10) {
    target = new Date(year, 4, 3); // 3 maja
    targetLabel = '3 maja';
  } else {
    target = new Date(year, 11, 8); // 8 grudnia
    targetLabel = '8 grudnia';
  }
  const diff = target.getTime() - today.getTime();
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  const dniTxt = days === 1 ? 'dzień' : 'dni';
  return `Pozostało ${days} ${dniTxt} do ${targetLabel}!`;
}

export function getDaysRangeLabel(currentDateTime: Date | null): string {
  const today = currentDateTime ?? new Date();
  today.setHours(0,0,0,0);
  const year = today.getMonth() > 10 ? today.getFullYear() + 1 : today.getFullYear();
  const marzec20 = new Date(year, 2, 20); // 20 marca
  const maj10 = new Date(year, 4, 10); // 10 maja
  if (today > marzec20 && today < maj10) {
    // Cykl wiosenny
    return `22 III do 3 V`;
  } else {
    // Cykl zimowy
    return `5 XI do 8 XII`;
  }
}
