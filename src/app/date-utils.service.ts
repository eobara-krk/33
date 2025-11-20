import { Injectable } from '@angular/core';
import { Item, LinkGroup, SingleLink } from './constants';

@Injectable({ providedIn: 'root' })
export class DateUtilsService {
  isTodayInTitleRange(title: string, currentDateTime?: Date): boolean {
    if (!title) return false;
    const matches = title.match(/\d{4}-\d{2}-\d{2}/g);
    if (!matches || matches.length < 2) return false;
    const start = new Date(matches[0]);
    const end = new Date(matches[1]);
    const today = currentDateTime ?? new Date();
    today.setHours(0,0,0,0);
    return today >= start && today <= end;
  }

  isToday(name: string, currentDateTime?: Date): boolean {
    if (!name) return false;
    const newFormatMatch = name.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    const today = currentDateTime ?? new Date();
    if (newFormatMatch) {
      const [, day, month, year] = newFormatMatch;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate();
    }
    const oldFormatMatch = name.match(/\d{4}-\d{2}-\d{2}/);
    if (oldFormatMatch) {
      const date = new Date(oldFormatMatch[0]);
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate();
    }
    return false;
  }

  hasInnerTodayElements(group: LinkGroup, currentDateTime?: Date): boolean {
    if (!group.links) return false;
    return group.links.some((link: SingleLink) => {
      if (link.name && this.isToday(link.name, currentDateTime)) return true;
      if (link.label && this.isToday(link.label, currentDateTime)) return true;
      if (link.url && this.isToday(link.url, currentDateTime)) return true;
      if (link.links) {
        return link.links.some((nestedLink: SingleLink) => {
          return (nestedLink.label && this.isToday(nestedLink.label, currentDateTime)) ||
                 (nestedLink.url && this.isToday(nestedLink.url, currentDateTime)) ||
                 (nestedLink.name && this.isToday(nestedLink.name, currentDateTime));
        });
      }
      return false;
    });
  }

  hasInnerTodayGroups(item: Item, currentDateTime?: Date): boolean {
    if (!item.links) return false;
    return item.links.some((group: LinkGroup) => {
      if (group.name && this.isToday(group.name, currentDateTime)) return true;
      return this.hasInnerTodayElements(group, currentDateTime);
    });
  }
}
