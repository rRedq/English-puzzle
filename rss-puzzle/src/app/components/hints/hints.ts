import './hints.scss';
import CreateElement from '../create-element';
import { button, div } from '../../utils/tag-functions';
import type { Fields } from '../../types/types';

export default class Hints extends CreateElement {
  private sentence: string = '';

  private cover: CreateElement = Hints.fields().cover;

  private textBtn: CreateElement = Hints.fields().textBtn;

  private textField: boolean = true;

  constructor() {
    super({ tag: 'div', className: 'hints' });
    this.appendChildren([this.cover, div({ className: 'hints__buttons' }, this.textBtn)]);
    this.textBtn.addEventListener('click', this.clickText);
  }

  public createHints(sentence: string) {
    this.sentence = sentence;
    this.cover.removeChildren();
    this.cover.elementAppend(div({ className: 'hints__text', textContent: `${this.sentence}` }));
  }

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

  private static fields(): Fields {
    return {
      cover: div({ className: 'hints__cover' }),
      textBtn: button({
        className: 'hints__text hints__btn',
      }),
    };
  }
}
