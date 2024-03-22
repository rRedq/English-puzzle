import CreateElement from '../create-element';
import PuzzleItem from '../puzzle-item/puzzle-item';
import type Game from './game';
import { getNewPosition } from '../../utils/functions';
import { div } from '../../utils/tag-functions';
import { CanvasCover } from '../../types/types';

export default class ActiveGame extends CreateElement {
  private currentString: string;

  private puzzle: CreateElement;

  private root: Game;

  private canvases: CanvasCover[];

  constructor(main: CreateElement, str: string, puzzleField: CreateElement, root: Game, canvases: CanvasCover[]) {
    super({ tag: 'div', className: 'game__puzzle-field' });
    main.elementAppend(this);
    this.root = root;
    this.currentString = str;
    this.puzzle = puzzleField;
    this.canvases = canvases;
    this.createFields();
  }

  private createFields(): void {
    this.puzzle.getNode().replaceChildren();
    const canvases: CanvasCover[] = [...this.canvases];
    const sortedArray = canvases.sort(() => Math.random() - 0.5);

    sortedArray.forEach((item: CanvasCover) => {
      this.puzzle.elementAppend(new PuzzleItem(this, this.puzzle, item.canvas, item.width, item.position, item.word));
    });

    this.addEventListener('dragover', this.dragOver);
    this.addEventListener('touchmove', this.dragOver);
  }

  private dragOver = (e: Event | TouchEvent) => {
    e.preventDefault();

    const dragging: HTMLElement | undefined = PuzzleItem.returnDraging()?.getNode();
    if (!dragging) return;

    let applyAfter: Element | undefined;
    if (e instanceof TouchEvent) {
      const posX = e.touches[0].clientX;
      applyAfter = getNewPosition(this.getNode(), posX);
    } else if (e instanceof MouseEvent) {
      applyAfter = getNewPosition(this.getNode(), e.clientX);
    }

    const cover = div({ className: 'game__cover' });
    const isParent: boolean = dragging?.parentNode === this.puzzle.getNode();

    if (applyAfter) {
      if (isParent) {
        dragging.insertAdjacentElement('beforebegin', cover.getNode());
      }
      applyAfter.insertAdjacentElement('afterend', dragging);
    } else {
      if (isParent) {
        dragging.insertAdjacentElement('beforebegin', cover.getNode());
      }
      this.getNode().prepend(dragging);
    }
  };

  public rowItemLengthCheck(): void {
    const rowCheck = this.getChildren().length === this.currentString.split(' ').length;
    this.root.setVisibleCheckBtn(rowCheck);
  }

  public returnPrase(): HTMLCollection {
    return this.getChildren();
  }

  public removeRow(): void {
    this.puzzle.removeChildren();
    PuzzleItem.removeAllItems();
    this.removeNode();
  }
}
