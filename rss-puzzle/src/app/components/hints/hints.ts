import './hints.scss';
import CreateElement from '../create-element';
import { button, div } from '../../utils/tag-functions';

export default class Hints extends CreateElement {
  private sentence: string = '';

  private cover: CreateElement = Hints.fields().cover;

  private textBtn: CreateElement = Hints.fields().textBtn;

  constructor() {
    super({ tag: 'div', className: 'hints' });
    this.appendChildren([this.cover, div({ className: 'hints__buttons' }, this.textBtn)]);
  }

  public createHints(sentence: string) {
    this.sentence = sentence;
    this.cover.removeChildren();
    this.cover.elementAppend(div({ className: 'hints__text', textContent: `${this.sentence}` }));
  }

  private static fields() {
    return {
      cover: div({ className: 'hints__cover' }),
      textBtn: button({ className: 'hints__text hints__btn' }),
    };
  }
}
