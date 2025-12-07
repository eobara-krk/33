import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
      /** Emits url on every timeupdate for any audio */
      public timeUpdate$ = new Subject<string>();
    /** Zwraca aktualny czas odtwarzania dla danego url (w sekundach) */
    getAudioCurrentTime(url: string): number {
      const audio = this.audioElements[url];
      return audio ? audio.currentTime : 0;
    }

    /** Zwraca długość utworu dla danego url (w sekundach) */
    getAudioDuration(url: string): number {
      const audio = this.audioElements[url];
      return audio && audio.duration ? audio.duration : 0;
    }

    /** Ustawia aktualny czas odtwarzania dla danego url */
    setAudioCurrentTime(url: string, value: number): void {
      const audio = this.audioElements[url];
      if (audio) {
        audio.currentTime = value;
      }
    }

    /** Czy audio jest gotowe do odczytu czasu/długości */
    getAudioReady(url: string): boolean {
      const audio = this.audioElements[url];
      return !!(audio && audio.readyState > 0);
    }
  /** Pauza bez resetowania czasu - zatrzymuje audio, ale można wznowić od miejsca zatrzymania */
  pauseOnly(url: string) {
    if (this.audioElements[url]) {
      this.audioElements[url].pause();
      // NIE resetujemy currentTime!
      if (this.playingUrl === url) this.playingUrl = null;
    }
  }
  private audioElements: { [url: string]: HTMLAudioElement } = {};
  private playingUrl: string | null = null;

  play(url: string, volume: number = 0.8, onEnd?: () => void, onError?: () => void) {
    // Jeśli audio już istnieje i jest zatrzymane (pauza), wznowienie bez resetowania czasu
    if (this.audioElements[url] && this.audioElements[url].paused && this.audioElements[url].currentTime > 0 && this.playingUrl === null) {
      this.audioElements[url].play()
        .then(() => {
          this.playingUrl = url;
        })
        .catch(() => {
          this.playingUrl = null;
          if (onError) onError();
        });
      return;
    }
    // Jeśli audio nie istnieje lub jest inne, zatrzymaj wszystko i odtwórz od początku
    this.stopAll();
    if (!this.audioElements[url]) {
      this.audioElements[url] = new Audio(url);
      this.audioElements[url].volume = volume;
      this.audioElements[url].addEventListener('timeupdate', () => {
        this.timeUpdate$.next(url);
      });
      this.audioElements[url].addEventListener('ended', () => {
        if (this.playingUrl === url) {
          this.playingUrl = null;
          if (onEnd) onEnd();
        }
      });
      this.audioElements[url].addEventListener('error', () => {
        if (this.playingUrl === url) {
          this.playingUrl = null;
          if (onError) onError();
        }
      });
    } else {
      this.audioElements[url].currentTime = 0;
    }
    this.audioElements[url].play()
      .then(() => {
        this.playingUrl = url;
      })
      .catch(() => {
        this.playingUrl = null;
        if (onError) onError();
      });
  }
  /**
   * Usuwa nieużywane elementy audio z pamięci (nie są odtwarzane i currentTime = 0)
   */
  cleanUnusedAudio() {
    Object.keys(this.audioElements).forEach(url => {
      const audio = this.audioElements[url];
      if (audio && audio.paused && audio.currentTime === 0) {
        audio.src = '';
        delete this.audioElements[url];
      }
    });
  }

  pause(url: string) {
    if (this.audioElements[url]) {
      this.audioElements[url].pause();
      this.audioElements[url].currentTime = 0;
      if (this.playingUrl === url) this.playingUrl = null;
      this.cleanUnusedAudio();
    }
  }

  stopAll() {
    Object.values(this.audioElements).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.playingUrl = null;
    this.cleanUnusedAudio();
  }

  isPlaying(url: string): boolean {
    return this.playingUrl === url;
  }

  getCurrentUrl(): string | null {
    return this.playingUrl;
  }
}
