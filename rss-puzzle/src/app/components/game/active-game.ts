import CreateElement from '../create-element';
import PuzzleItem from './puzzle-item';
import type Game from './game';
import { setDragging } from '../../utils/functions';

export default class ActiveGame extends CreateElement {
  private currentString: string;

  private puzzle: CreateElement;

  private root: Game;

  constructor(main: CreateElement, str: string, puzzleField: CreateElement, root: Game) {
    super({ tag: 'div', className: 'game__puzzle-field' });
    main.elementAppend(this);
    this.root = root;
    this.currentString = str;
    this.puzzle = puzzleField;
    this.createFields();
  }

  private createFields() {
    const wordArray: string[] = this.currentString
      .toLowerCase()
      .split(' ')
      .sort(() => Math.random() - 0.5);

    wordArray.forEach((word: string) => {
      const elem = new PuzzleItem(this, word);
      this.puzzle.elementAppend(elem);
    });

    setDragging([this.puzzle.getNode(), this.getNode()]);
  }

  public rowItemLengthCheck() {
    const rowCheck = this.getChildren().length === this.currentString.split(' ').length;
    this.root.setVisibleCheckBtn(rowCheck);
  }

  public returnPrase(): HTMLCollection {
    return this.getChildren();
  }

  public removeRow() {
    this.puzzle.removeChildren();
    PuzzleItem.removeAllItems();
    this.removeNode();
  }
}
