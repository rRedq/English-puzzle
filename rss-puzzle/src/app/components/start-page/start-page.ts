import type App from '../../app';
import CreateElement from '../create-element';
import { button, div, h2, p } from '../../utils/tag-functions';
import './start-page.scss';
import { getStorage } from '../../utils/functions';
import { CurrentWord, type StorageAccess } from '../../types/interfaces';

export default class StartPage extends CreateElement {
  private app: App;

  private button: CreateElement;

  private container = div({ className: 'start-page__container' });

  private h2 = h2({ className: 'start-page__h2', textContent: 'Puzzle English' });

  private text = p({
    className: 'start-page__p',
    textContent:
      'This is an app for English language learners with different levels of difficulty and wide variety of phrases. Everyone will find something interesting there.',
  });

  private greet = div({ className: 'start-page__greet' });

  constructor(elem: App) {
    super({ tag: 'div', className: 'start-page' });
    this.app = elem;
    this.button = button({ className: 'start-page__btn', textContent: 'Start' });
    const nameAndSurname = getStorage<StorageAccess>('access');
    this.greet.textContent(`Hello, ${nameAndSurname?.firstName} ${nameAndSurname?.surName}, nice to meet you!`);
    this.container.appendChildren([this.h2, this.greet, this.text, this.button]);
    this.elementAppend(this.container);
    this.button.addEventListener('click', this.closeStartPage.bind(this));
  }

  private closeStartPage(): void {
    this.button.removeEventListener('click', this.closeStartPage);
    this.removeNode();
    const lastGame = getStorage<CurrentWord>('lastGame');
    if (lastGame) this.app.startGame(lastGame, true);
    else this.app.startGame(lastGame);
  }
}
