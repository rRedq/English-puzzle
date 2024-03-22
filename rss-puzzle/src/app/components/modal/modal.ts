import { WordPosition } from '../../types/interfaces';
import { div, p } from '../../utils/tag-functions';
import CreateElement from '../create-element';
import './modal.scss';

export default class Modal extends CreateElement {
  constructor(lastGame: WordPosition) {
    super({ tag: 'div', className: 'modal' });
    const text = p({
      textContent: 'The game has been continued from where it had been ended',
    });
    const level = p({
      textContent: `Current level - ${lastGame.level}`,
    });
    const round = p({
      textContent: `Current round - ${lastGame.round + 1}`,
    });
    this.elementAppend(div({ className: 'modal__content' }, text, level, round));
    const timerToRemoveModal = 4000;
    setTimeout(() => {
      this.removeNode();
    }, timerToRemoveModal);
  }
}
