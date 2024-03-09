import CreateElement from '../create-element';
import PuzzleItem from './puzzle-item';
import RowItem from './row-item';
import { div } from '../../utils/tag-functions';
import type Game from './game';

export default class ActiveGame extends CreateElement {
  private main: CreateElement;

  private currentString: string;

  private puzzleArray: CreateElement[] = [];

  private puzzle: CreateElement;

  private root: Game;

  constructor(main: CreateElement, str: string, puzzleField: CreateElement, root: Game) {
    super({ tag: 'div', className: 'game__main-field-row' });
    this.main = main;
    this.root = root;
    main.elementAppend(this);
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
      const elem = div(
        {
          className: 'game__cover',
        },
        new PuzzleItem(this, word)
      );
      this.puzzle.elementAppend(elem);
      this.puzzleArray.push(elem);
    });
  }

  public rowItemLengthCheck(isNull: boolean) {
    this.root.setVisibleCheckBtn(isNull);
  }

  public changeToMainField(message: string): void {
    const elem = new RowItem(this, message);
    this.elementAppend(elem);
  }

  public changeToPuzzleField(message: string): void {
    this.root.setVisibleCheckBtn(false);
    for (let i = 0; i < this.puzzleArray.length; i += 1) {
      if (!this.puzzleArray[i].hasChildNodes()) {
        this.puzzleArray[i].elementAppend(new PuzzleItem(this, message));
        break;
      }
    }
  }

  public checkPhrase(): boolean {
    return this.currentString === RowItem.returnWord();
  }

  public removeRow() {
    RowItem.removeAllItems();
    this.puzzle.removeChildren();
    this.puzzleArray.length = 0;
    PuzzleItem.removeAllItems();
    this.removeNode();
  }
}
