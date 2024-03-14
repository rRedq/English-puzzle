import type App from '../../app';
import { CurrentWord } from '../../types/interfaces';
import { getStorage } from '../../utils/functions';
import { button, div } from '../../utils/tag-functions';
import CreateElement from '../create-element';
import './result.scss';

export default class Result extends CreateElement {
  private app: App;

  private countinueBtn = button({
    className: 'result__continue',
    textContent: 'Continue',
    onclick: () => this.countinueClick(),
  });

  constructor(app: App) {
    super({ tag: 'div', className: 'result' });
    this.app = app;
    this.elementAppend(div({ className: 'result__stat' }, this.countinueBtn));
  }

  private countinueClick = () => {
    this.addClass('result__fade-out');
    setTimeout(() => {
      this.removeNode();
      const game = getStorage<CurrentWord>('lastGame');
      this.app.startGame(game);
    }, 900);
  };
}
