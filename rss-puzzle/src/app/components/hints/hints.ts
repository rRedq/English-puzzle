import './hints.scss';
import CreateElement from '../create-element';
import { button, div } from '../../utils/tag-functions';
import type { HintFields } from '../../types/types';
import { getStorage, setStorage } from '../../utils/functions';
import { type StorageHints } from '../../types/interfaces';

export default class Hints extends CreateElement {
  private sentence: string = '';

  private soundPath: string | undefined;

  private cover: CreateElement = Hints.fields().cover;

  private textBtn: CreateElement = Hints.fields().textBtn;

  private soundBtn: CreateElement = Hints.fields().soundBtn;

  private onSound: CreateElement = Hints.fields().onSound;

  private textHint: CreateElement = Hints.fields().textHint;

  private isText: boolean = true;

  private isSound: boolean = true;

  constructor() {
    super({ tag: 'div', className: 'hints' });
    this.appendChildren([this.cover, div({ className: 'hints__buttons' }, this.textBtn, this.soundBtn)]);
    this.textBtn.addEventListener('click', this.clickText);
    this.soundBtn.addEventListener('click', this.clickSound);
    this.onSound.addEventListener('click', this.onSoundHint);
    this.onSound.setAttribute('playing', 'false');
    this.setHintsStatus();
  }

  public createHints(sentence: string, path: string) {
    this.sentence = sentence;
    this.soundPath = path;
    this.cover.removeChildren();
    this.textHint.textContent(this.sentence);
    this.cover.appendChildren([this.onSound, this.textHint]);
  }

  private onSoundHint = () => {
    const link = `https://github.com/rolling-scopes-school/rss-puzzle-data/raw/main/${this.soundPath}`;
    const audio = new Audio(link);

    if (this.onSound.getNode().getAttribute('playing') === 'false') {
      audio.play();
      this.onSound.addClass('active-sound');
      audio.addEventListener('ended', () => {
        this.onSound.setAttribute('playing', 'false');
        this.onSound.removeClass('active-sound');
      });
      this.onSound.setAttribute('playing', 'true');
    }
  };

  private clickSound = () => {
    this.soundBtn.toggleClass('disable');
    this.isSound = !this.isSound;
    this.showHints(this.isText, this.isSound);
  };

  private clickText = () => {
    this.textBtn.toggleClass('disable');
    this.isText = !this.isText;
    this.showHints(this.isText, this.isSound);
  };

  private showHints(isText: boolean, isSound: boolean) {
    this.textHint.setProperty('visibility', `${isText ? 'visible' : 'hidden'}`);
    this.onSound.setProperty('visibility', `${isSound ? 'visible' : 'hidden'}`);
    setStorage('hints', { isText: this.isText, isSound: this.isSound });
  }

  private setHintsStatus() {
    const statuses = getStorage<StorageHints>('hints');
    if (statuses) {
      this.isText = statuses.isText;
      this.isSound = statuses.isSound;
    }
    this.showHints(this.isText, this.isSound);
    if (this.isText) this.textBtn.removeClass('disable');
    else this.textBtn.addClass('disable');
    if (this.isSound) this.soundBtn.removeClass('disable');
    else this.soundBtn.addClass('disable');
  }

  public afterRound(state: 'check' | 'countinue'): void {
    if (state === 'check') this.showHints(true, true);
    else this.showHints(this.isText, this.isSound);
  }

  private static fields(): HintFields<CreateElement> {
    return {
      cover: div({ className: 'hints__cover' }),
      textBtn: button({
        className: 'hints__text-btn hints__btn',
      }),
      onSound: button({
        className: 'hints__pronounce',
      }),
      soundBtn: button({
        className: 'hints__sound-btn hints__btn',
      }),
      textHint: div({ className: 'hints__text' }),
    };
  }
}
