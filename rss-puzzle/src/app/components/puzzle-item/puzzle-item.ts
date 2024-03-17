import { Position } from '../../types/types';
import { div } from '../../utils/tag-functions';
import CreateElement from '../create-element';
import type ActiveGame from '../game/active-game';
import './puzzle-item.scss';

export default class PuzzleItem extends CreateElement {
  private static nodes: PuzzleItem[] = [];

  private childRoot: ActiveGame;

  private parentRoot: CreateElement;

  private currentPlace: CreateElement | ActiveGame;

  private static dragging: PuzzleItem | undefined;

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
      className: 'game__item',
    });
    this.childRoot = elem;
    this.parentRoot = parent;
    this.currentPlace = parent;
    canvas.addClass('canvas');
    const puzzle = div({ className: `${position}`, textContent: word }, canvas);
    this.elementAppend(puzzle);
    this.setProperty('width', `${width}px`);
    PuzzleItem.nodes.push(this);
    this.setDragable();
    this.setListeners();
  }

  private setListeners(): void {
    this.addEventListener('dragstart', () => {
      PuzzleItem.dragging = this;
      this.addClass('dragging');
    });
    this.addEventListener('dragend', () => {
      PuzzleItem.dragging = undefined;
      this.removeClass('dragging');
      this.childRoot.rowItemLengthCheck();
      PuzzleItem.clearClasses();
    });
    this.addEventListener('click', this.clickItem);
  }

  public static returnDragging(): PuzzleItem | undefined {
    return PuzzleItem.dragging;
  }

  public switchRootForDragging(): void {
    this.currentPlace = this.childRoot;
  }

  private clickItem = (): void => {
    PuzzleItem.clearClasses();
    if (this.currentPlace === this.parentRoot) {
      this.currentPlace = this.childRoot;
      this.currentPlace.elementAppend(this);
    } else {
      this.currentPlace = this.parentRoot;
      const covers = this.currentPlace.getChildren();
      for (let i = 0; i < covers.length; i += 1) {
        if (!covers[i].hasChildNodes()) {
          covers[i].append(this.getNode());
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

  public static getRow(): PuzzleItem[] {
    return PuzzleItem.nodes;
  }

  public static removeAllItems(): void {
    PuzzleItem.nodes.length = 0;
  }
}
