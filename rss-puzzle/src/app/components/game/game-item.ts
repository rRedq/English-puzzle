import CreateElement from '../create-element';
import type Game from './game';
import { div } from '../../utils/tag-functions';

export default class GameItem extends CreateElement {
  private elem: Game;

  private message: string;

  private container = div({
    className: 'game__cover',
    onclick: () => {
      this.onClickCover();
    },
  });

  constructor(elem: Game, cover: CreateElement, message: string) {
    super({
      tag: 'div',
      className: 'game__item',
      textContent: message,
      onclick: () => {
        this.onClickItem();
      },
    });
    cover.elementAppend(this.container);
    this.container.elementAppend(this);
    this.elem = elem;
    this.message = message;
  }

  private onClickItem(): void {
    this.removeNode();
    this.elem.changeToMainField(this.message);
  }

  private onClickCover() {
    this.container.addClass('game__cover-empty');
  }

  public click() {
    this.message = '1';
    console.log(1);
  }
}
