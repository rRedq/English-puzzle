import './hints.scss';
import CreateElement from '../create-element';
import { button, div } from '../../utils/tag-functions';
import type { HintFields } from '../../types/types';

export default class Hints extends CreateElement {
  private sentence: string = '';

  private soundPath: string | undefined;

  private cover: CreateElement = Hints.fields().cover;

  private textBtn: CreateElement = Hints.fields().textBtn;

  private onSound: CreateElement = Hints.fields().onSound;

  private textField: boolean = true;

  constructor() {
    super({ tag: 'div', className: 'hints' });
    this.appendChildren([this.cover, div({ className: 'hints__buttons' }, this.textBtn)]);
    this.textBtn.addEventListener('click', this.clickText);
    this.onSound.addEventListener('click', this.onSoundClick);
    this.onSound.setAttribute('playing', 'false');
  }

  public createHints(sentence: string, path: string) {
    this.sentence = sentence;
    this.soundPath = path;
    this.cover.removeChildren();
    this.cover.appendChildren([this.onSound, div({ className: 'hints__text', textContent: `${this.sentence}` })]);
  }

  private onSoundClick = () => {
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

  private clickText = () => {
    this.textBtn.toggleClass('disable');
    this.textField = !this.textField;
    this.showHints(this.textField);
  };

  private showHints(isText: boolean) {
    this.cover.setProperty('visibility', `${isText ? 'visible' : 'hidden'}`);
  }

  public afterRound(state: 'check' | 'countinue'): void {
    if (state === 'check') this.showHints(true);
    else this.showHints(this.textField);
  }

  private static fields(): HintFields {
    return {
      cover: div({ className: 'hints__cover' }),
      textBtn: button({
        className: 'hints__text hints__btn',
      }),
      onSound: button({
        className: 'hints__sound',
      }),
    };
  }
}
