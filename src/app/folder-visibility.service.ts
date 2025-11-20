import { Injectable } from '@angular/core';
import { Item, LinkGroup, SingleLink } from './constants';

@Injectable({ providedIn: 'root' })
export class FolderVisibilityService {
  openTodayFolders(items: Item[], isTodayInTitleRange: (title: string) => boolean, isToday: (name: string) => boolean) {
    items.forEach((item: Item) => {
      if (isTodayInTitleRange(item.title)) {
        item.show = true;
      }
      item.links?.forEach((group: LinkGroup) => {
        if (group.name && isToday(group.name)) {
          group.show = true;
          item.show = true;
        }
        group.links?.forEach((nestedLink: SingleLink) => {
          if (nestedLink.name && isToday(nestedLink.name)) {
            nestedLink.show = true;
            group.show = true;
            item.show = true;
          }
        });
      });
    });
  }

  toggle(items: Item[], obj: Item, stopAllAudio: () => void) {
    items.forEach((item: Item) => {
      if (item !== obj) {
        item.show = false;
        item.links?.forEach((group: LinkGroup) => {
          group.show = false;
          group.links?.forEach((nestedLink: SingleLink) => {
            if (nestedLink.show !== undefined) nestedLink.show = false;
          });
        });
      } else {
        if (item.show) {
          item.links?.forEach((group: LinkGroup) => {
            group.show = false;
            group.links?.forEach((nestedLink: SingleLink) => {
              if (nestedLink.show !== undefined) nestedLink.show = false;
            });
          });
        }
      }
    });
    if (obj.show) stopAllAudio();
    obj.show = !obj.show;
  }

  openOnly(items: Item[], groupToOpen: LinkGroup, item: Item, summaryPassword: string) {
    items.forEach((i: Item) => {
      if (i !== item) i.show = false;
      i.links?.forEach((g: LinkGroup) => g.show = false);
    });
    item.links?.forEach((g: LinkGroup) => { if (g !== groupToOpen) g.show = false; });
    if (groupToOpen.links && groupToOpen.links.length === 1) {
      window.open(groupToOpen.links[0].url, '_blank');
      return;
    }
    if (groupToOpen.protected) {
      if (groupToOpen.show) { groupToOpen.show = false; return; }
      const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
      if (password === summaryPassword) {
        groupToOpen.show = true;
      } else {
        alert('Błędne hasło!');
      }
      return;
    }
    groupToOpen.show = !groupToOpen.show;
  }

  collapseAll(items: Item[]) {
    items.forEach((item: Item) => {
      item.show = false;
      item.links?.forEach((group: LinkGroup) => {
        group.show = false;
        group.links?.forEach((nestedLink: SingleLink) => {
          if (nestedLink.show !== undefined) nestedLink.show = false;
        });
      });
    });
  }

  expandToday(items: Item[], openTodayFolders: (items: Item[]) => void) {
    this.collapseAll(items);
    openTodayFolders(items);
  }

  toggleLink(group: LinkGroup, summaryPassword: string) {
    if (group.links && group.links.length === 1) {
      window.open(group.links[0].url, '_blank');
      return;
    }
    if (group.protected) {
      if (group.show) { group.show = false; return; }
      const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
      if (password === summaryPassword) group.show = true;
      else alert('Błędne hasło!');
      return;
    }
    group.show = !group.show;
  }

  toggleNestedGroup(nestedGroup: SingleLink) {
    nestedGroup.show = !nestedGroup.show;
  }
}
