import type App from '../../app';
import CreateElement from '../create-element';
import { main, div } from '../../utils/tag-functions';
import data from '../../data/wordCollectionLevel1.json';
import { type DataJson } from '../../types/interfaces';
import './game.scss';
import GameItem from './game-item';

export default class Game extends CreateElement {
  private app: App;

  private container = main({ className: 'game' });

  private puzzle = div({
    className: 'game__puzzle-field',
  });

  private mainFild = div({ className: 'game__main-field' });

  private mainFieldRow = div({ className: 'game__main-field-row' });

  private data: DataJson;

  private puzzleArray: GameItem[] = [];

  private mainArray: string[] = [];

  constructor(app: App) {
    super({ tag: 'div', className: 'game__fields' });
    this.app = app;
    this.data = data;
  }

  public createGame(): void {
    this.container.elementAppend(this);
    this.app.elementAppend(this.container);
    this.appendChildren([this.mainFild, this.puzzle]);
    this.mainFild.elementAppend(this.mainFieldRow);
    this.createFields();
  }

  private createFields(): void {
    const wordArray: string[] = this.data.rounds[0].words[0].textExample
      .toLowerCase()
      .split(' ')
      .sort(() => Math.random() - 0.5);
    wordArray.forEach((item) => {
      this.puzzleArray.push(new GameItem(this, this.puzzle, item));
    });
  }

  public changeToMainField(message: string): void {
    this.mainArray.push(message);
    this.mainFieldRow.elementAppend(div({ className: 'game__item-row', textContent: message }));
  }

  public clearGame() {
    this.container.removeNode();
    this.removeNode();
  }
}
