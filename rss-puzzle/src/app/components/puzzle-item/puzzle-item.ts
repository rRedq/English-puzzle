import { StorageHints } from '../../types/interfaces';
import { Position } from '../../types/types';
import { getStorage } from '../../utils/functions';
import { div } from '../../utils/tag-functions';
import CreateElement from '../create-element';
import type ActiveGame from '../game/active-game';
import './puzzle-item.scss';

export default class PuzzleItem extends CreateElement {
  private static nodes: PuzzleItem[] = [];

  private childRoot: ActiveGame;

  private parentRoot: CreateElement;

  private canvas: CreateElement;

  constructor(
    elem: ActiveGame,
    parent: CreateElement,
    canvas: CreateElement,
    width: number,
    position: Position,
    word: string
  ) {
    super({
      tag: 'div',
      className: `game__item content`,
    });
    this.childRoot = elem;
    this.parentRoot = parent;
    this.canvas = canvas;
    this.canvas.addClass('canvas');
    const puzzle = div({ className: `${position}`, textContent: word }, canvas);
    this.elementAppend(puzzle);
    const pers = (width / 900) * 100;
    this.setProperty('width', `${pers}%`);
    this.initItem();
  }

  private initItem(): void {
    const statuses = getStorage<StorageHints>('hints');
    if (statuses?.isBackground === false) this.canvas.getNode().style.visibility = 'hidden';

    PuzzleItem.nodes.push(this);
    this.setDragable();
    this.setListeners();
  }

  private setListeners(): void {
    this.addEventListener('dragstart', () => {
      this.addClass('dragging');
    });
    this.addEventListener('dragend', () => {
      this.removeClass('dragging');
      this.childRoot.rowItemLengthCheck();
      PuzzleItem.clearClasses();
    });
    this.addEventListener('click', this.clickItem);
  }

  private clickItem = (): void => {
    PuzzleItem.clearClasses();

    if (this.getNode().parentNode === this.parentRoot.getNode()) {
      const cover = div({ className: 'game__cover' });
      this.getNode().insertAdjacentElement('beforebegin', cover.getNode());
      this.childRoot.elementAppend(this);
    } else {
      const covers = this.parentRoot.getChildren();
      for (let i = 0; i < covers.length; i += 1) {
        if (!covers[i].hasChildNodes()) {
          this.parentRoot.getNode().replaceChild(this.getNode(), covers[i]);
          break;
        }
      }
    }
    this.childRoot.rowItemLengthCheck();
  };

  private static clearClasses(): void {
    for (let i = 0; i < PuzzleItem.nodes.length; i += 1) {
      PuzzleItem.nodes[i].getNode().style.filter = 'drop-shadow(0 0 2px #0353a4) drop-shadow(0 0 2px #0353a4)';
    }
  }

  public static getRow(): CreateElement[] {
    const puzzles: CreateElement[] = [];
    PuzzleItem.nodes.forEach((puzzle) => {
      puzzles.push(puzzle.canvas);
    });
    return puzzles;
  }

  public static removeAllItems(): void {
    PuzzleItem.nodes.length = 0;
  }
}
