import type App from '../../app';
import CreateElement from '../create-element';
import { button, div, h2, p } from '../../utils/tag-functions';
import './start-page.scss';

export default class StartPage extends CreateElement {
  private app: App;

  private button: CreateElement;

  constructor(elem: App) {
    super({ tag: 'div', className: 'start-page' });
    this.app = elem;
    this.button = button({ className: 'start-page__btn', textContent: 'Start' });
  }

  public createStartPage(): CreateElement {
    this.removeChildren();
    this.elementAppend(
      div(
        { className: 'start-page__container' },
        h2({ className: 'start-page__h2', textContent: 'Puzzle English' }),
        p({
          className: 'start-page__p',
          textContent:
            'A brief description of the game is present and effectively communicates what the game is about.',
        }),
        this.button
      )
    );
    this.button.addEventListener('click', this.startGame.bind(this));
    return this;
  }

  private startGame(): void {
    this.removeNode();
  }
}
