import './hints.scss';
import CreateElement from '../create-element';
import { button, div } from '../../utils/tag-functions';
import type { HintFields } from '../../types/types';
import { getStorage, setStorage } from '../../utils/functions';
import { type StorageHints } from '../../types/interfaces';
import PuzzleItem from '../puzzle-item/puzzle-item';

export default class Hints extends CreateElement {
  private sentence: string = '';

  private soundPath: string | undefined;

  private cover: CreateElement = Hints.fields().cover;

  private textBtn: CreateElement = Hints.fields().textBtn;

  private soundBtn: CreateElement = Hints.fields().soundBtn;

  private onSound: CreateElement = Hints.fields().onSound;

  private textHint: CreateElement = Hints.fields().textHint;

  private backgroundBtn: CreateElement = Hints.fields().backgroundBtn;

  private isText: boolean = true;

  private isSound: boolean = true;

  private isBackground: boolean = true;

  constructor() {
    super({ tag: 'div', className: 'hints' });
    this.appendChildren([
      this.cover,
      div({ className: 'hints__buttons' }, this.textBtn, this.soundBtn, this.backgroundBtn),
    ]);
    this.textBtn.addEventListener('click', this.clickText);
    this.soundBtn.addEventListener('click', this.clickSound);
    this.onSound.addEventListener('click', this.onSoundHint);
    this.backgroundBtn.addEventListener('click', this.clickBackground);
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

  private clickBackground = (): void => {
    this.backgroundBtn.toggleClass('disable');
    this.isBackground = !this.isBackground;
    setStorage<StorageHints>('hints', { isText: this.isText, isSound: this.isSound, isBackground: this.isBackground });
    this.backgroundVisability();
  };

  private backgroundVisability() {
    const canvases = PuzzleItem.getRow();

    canvases.forEach((canvas) => {
      const elem = canvas.getNode();

      if (this.isBackground) elem.style.visibility = 'visible';
      else elem.style.visibility = 'hidden';
    });
  }

  private clickSound = () => {
    this.soundBtn.toggleClass('disable');
    this.isSound = !this.isSound;
    setStorage<StorageHints>('hints', { isText: this.isText, isSound: this.isSound, isBackground: this.isBackground });
    this.showHints(this.isText, this.isSound);
  };

  private clickText = () => {
    this.textBtn.toggleClass('disable');
    this.isText = !this.isText;
    setStorage<StorageHints>('hints', { isText: this.isText, isSound: this.isSound, isBackground: this.isBackground });
    this.showHints(this.isText, this.isSound);
  };

  private showHints(isText: boolean, isSound: boolean) {
    this.textHint.setProperty('visibility', `${isText ? 'visible' : 'hidden'}`);
    this.onSound.setProperty('visibility', `${isSound ? 'visible' : 'hidden'}`);
  }

  private setHintsStatus() {
    const statuses = getStorage<StorageHints>('hints');
    if (statuses) {
      this.isText = statuses.isText;
      this.isSound = statuses.isSound;
      this.isBackground = statuses.isBackground;
    }
    this.showHints(this.isText, this.isSound);
    this.backgroundVisability();
    if (this.isText) this.textBtn.removeClass('disable');
    else this.textBtn.addClass('disable');
    if (this.isSound) this.soundBtn.removeClass('disable');
    else this.soundBtn.addClass('disable');
    if (this.isBackground) this.backgroundBtn.removeClass('disable');
    else this.backgroundBtn.addClass('disable');
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
      backgroundBtn: button({
        className: 'hints__background-btn hints__btn',
      }),
    };
  }
}
