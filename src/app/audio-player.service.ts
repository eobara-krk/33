import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audioElements: { [url: string]: HTMLAudioElement } = {};
  private playingUrl: string | null = null;

  play(url: string, volume: number = 0.8, onEnd?: () => void, onError?: () => void) {
    // Stop all other audio
    this.stopAll();
    if (!this.audioElements[url]) {
      this.audioElements[url] = new Audio(url);
      this.audioElements[url].volume = volume;
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

  pause(url: string) {
    if (this.audioElements[url]) {
      this.audioElements[url].pause();
      this.audioElements[url].currentTime = 0;
      if (this.playingUrl === url) this.playingUrl = null;
    }
  }

  stopAll() {
    Object.values(this.audioElements).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.playingUrl = null;
  }

  isPlaying(url: string): boolean {
    return this.playingUrl === url;
  }

  getCurrentUrl(): string | null {
    return this.playingUrl;
  }
}
