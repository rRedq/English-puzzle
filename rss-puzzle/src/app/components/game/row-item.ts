import CreateElement from '../create-element';
import type Game from './game';

export default class RowItem extends CreateElement {
  constructor(elem: Game, message: string) {
    super({
      tag: 'div',
      className: 'game__item-row',
      textContent: message,
      onclick: () => {
        elem.changeToPuzzleField(message);
        this.removeNode();
      },
    });
  }
}
