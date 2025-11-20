import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TextVisibilityService {
  toggleTextVisibility(linkItem: any) {
    if (linkItem.type === 'opis') {
      if (linkItem.show) {
        linkItem.show = false;
        setTimeout(() => {
          let parentElem = null;
          if (linkItem.label) {
            const allGroups = document.querySelectorAll('.group-container');
            for (let elem of Array.from(allGroups)) {
              if (elem.textContent && elem.textContent.includes(linkItem.label)) {
                parentElem = elem;
                break;
              }
            }
          }
          if (!parentElem) {
            const allFolders = document.querySelectorAll('[id^="folder-"]');
            if (allFolders.length > 0) {
              parentElem = allFolders[0];
            }
          }
          if (parentElem) {
            (parentElem as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        linkItem.show = true;
      }
    }
  }
}
