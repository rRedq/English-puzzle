import CreateElement from '../create-element';
import { div, button } from '../../utils/tag-functions';
import type { DataJson, CurrentWord, Word } from '../../types/interfaces';
import './game.scss';
import ActiveGame from './active-game';
import { getData, getProgressStorage, isNull, setProgressStorage, setStorage } from '../../utils/functions';
import { deleteStorageByKey, setStorageIsKnown } from '../../utils/storage-cover';
import Hints from '../hints/hints';
import Levels from '../level-difficulties/level-difficulties';
import type { CanvasCover, LevelsData } from '../../types/types';
import type App from '../../app';
import PuzzleItem from '../puzzle-item/puzzle-item';
import { levelUp } from '../../utils/helper-functions';
import cutCanvas from '../../utils/cut-canvas';

export default class Game extends CreateElement {
  private app: App;

  private puzzle = div({
    className: 'game__puzzle-field',
  });

  private mainFild = div({ className: 'game__main-field' });

  private compliteBtn = button({
    className: 'game__btn',
    textContent: "I don't know",
    onclick: () => this.compliteSentence(),
  });

  private countinueBtn = button({
    className: 'game__btn',
    textContent: 'Countinue',
    onclick: () => this.countinue(),
  });

  private checkBtn = button({
    className: 'game__btn',
    textContent: 'Check',
    onclick: () => this.checkRowPhrase(),
  });

  private resultBtn = button({
    className: 'game__btn',
    textContent: 'Result',
    onclick: () => this.clickResult(),
  });

  private data: DataJson | undefined;

  private activeRow: ActiveGame | undefined;

  private hints = new Hints();

  private currentRound: CurrentWord;

  private gameField: CreateElement = div({ className: 'game__fields' });

  private allRoundSentences: string[] = [];

  private allRoundImages: CanvasCover[][] = [[]];

  private currentRow = 0;

  constructor(app: App, round: CurrentWord = { level: 1, round: 0, word: 0 }) {
    super({ tag: 'main', className: 'game' });
    this.currentRound = round;
    this.compliteBtn.setProperty('display', 'block');
    this.loadData(this.currentRound.level);
    this.app = app;
    deleteStorageByKey('result');
  }

  private async loadData(level: LevelsData): Promise<void> {
    this.data = await getData(level);
    this.setImage();
  }

  private setImage() {
    const source = isNull(this.data).rounds[this.currentRound.round];
    const allSentence: string[] = [];
    source.words.forEach((sentence) => {
      allSentence.push(sentence.textExample);
    });
    this.allRoundSentences = allSentence;
    const imgSrc = source.levelData.imageSrc;
    cutCanvas(allSentence, imgSrc).then((result: CanvasCover[][]) => {
      this.allRoundImages = result;
      this.createGame();
    });
  }

  private myData(): Word {
    return isNull(this.data).rounds[this.currentRound.round].words[this.currentRound.word];
  }

  public createGame(): void {
    // Current-sentence
    this.allRoundSentences[this.currentRound.round] = this.myData().textExample.toLowerCase();

    // Levels
    this.appendChildren([
      new Levels(this.app, this.currentRound.level, this.currentRound.round, isNull(this.data?.rounds.length)),
      this.hints,
      this.gameField,
    ]);
    // Hints
    const sentence = this.myData().textExampleTranslate;
    const path = this.myData().audioExample;
    this.hints.createHints(sentence, path);
    // Buttons
    const cover = div(
      { className: 'game__buttons' },
      this.compliteBtn,
      this.countinueBtn,
      this.resultBtn,
      this.checkBtn
    );
    this.gameField.appendChildren([this.mainFild, this.puzzle, cover]);
    // Active game
    this.activeRow = new ActiveGame(
      this.mainFild,
      this.allRoundSentences[this.currentRound.round],
      this.puzzle,
      this,
      this.allRoundImages[this.currentRow]
    );
  }

  private countinue = (): void => {
    this.checkRound();
    if (this.currentRow === 9) this.currentRow = 0;
    else this.currentRow += 1;

    this.activeRow = new ActiveGame(
      this.mainFild,
      this.allRoundSentences[this.currentRound.round],
      this.puzzle,
      this,
      this.allRoundImages[this.currentRow]
    );
    this.hints.afterRound('countinue');
    const sentence = this.myData().textExampleTranslate;
    const path = this.myData().audioExample;
    this.hints.createHints(sentence, path);
    this.countinueBtn.setProperty('display', 'none');
    this.compliteBtn.setProperty('display', 'block');
  };

  private checkRound(isResult = true): void {
    if (this.currentRound.word > 8) {
      const currentLength = getProgressStorage(this.currentRound.level).length;
      const currentLevel = this.currentRound.level;
      if (this.currentRound.round + 1 < isNull(this.data).rounds.length) {
        setProgressStorage(this.currentRound.level, [this.currentRound.round]);
        this.currentRound.round += 1;
      } else if (this.currentRound.level + 1 < 7) {
        setProgressStorage(this.currentRound.level, [this.currentRound.round]);
        this.currentRound.level += 1;
        this.currentRound.round = 0;
      } else {
        setProgressStorage(this.currentRound.level, [this.currentRound.round]);
        this.currentRound.level = 1;
        this.currentRound.round = 0;
      }
      levelUp(isNull(this.data).roundsCount, currentLength, currentLevel);
      setStorage<CurrentWord>('lastGame', { level: this.currentRound.level, round: this.currentRound.round, word: 0 });
      if (isResult) this.app.startGame({ level: this.currentRound.level, round: this.currentRound.round, word: 0 });
    } else this.currentRound.word += 1;
    this.allRoundSentences[this.currentRound.round] = this.myData().textExample.toLowerCase();
  }

  private checkRowPhrase = (): void => {
    const words = isNull(this.activeRow?.returnPrase());

    const str: string[] = [];
    const currentStr = this.allRoundSentences[this.currentRound.round].split(' ');
    for (let i = 0; i < words.length; i += 1) {
      const word = isNull(words[i].firstChild).textContent;
      if (word) {
        str.push(word);
        if (currentStr[i] === word)
          (words[i] as HTMLElement).style.filter = 'drop-shadow(0 0 2px green) drop-shadow(0 0 2px green)';
        else (words[i] as HTMLElement).style.filter = 'drop-shadow(0 0 1px red) drop-shadow(0 0 2px red)';
      }
    }
    if (str.join(' ') === this.allRoundSentences[this.currentRound.round]) {
      const { level, round, word } = this.currentRound;
      setStorageIsKnown({ level, round, word, isKnown: 'know' });
      this.resetRow();
    }
  };

  private showFinalImage(): void {
    this.puzzle.getNode().replaceChildren();
    const main = this.mainFild.getChildren();
    for (let i = 0; i < main.length; i += 1) {
      const row = main[i].childNodes;
      for (let j = 0; j < row.length; j += 1) {
        (row[j] as HTMLElement).classList.remove('content');
        isNull(row[j].firstChild as HTMLElement).style.fontSize = '0px';
      }
    }
    this.puzzle.removeChildren();
    const source = isNull(this.data).rounds[this.currentRound.round].levelData;
    this.puzzle.elementAppend(div({ textContent: `${source.author} - ${source.name} (${source.year})` }));
  }

  private resetRow(): void {
    isNull(this.activeRow).removeRow();
    this.hints.afterRound('check');
    const recordRow = div({ className: 'game__puzzle-field' });
    const items = this.allRoundImages[this.currentRow];
    items.forEach((item) => {
      const canv = item.canvas.getNode();
      canv.style.visibility = 'visible';
      const puzzle = div({ className: item.position, textContent: item.word }, item.canvas);
      const cover = div({ className: 'game__item content' }, puzzle);
      const pers = (item.width / 900) * 100;
      cover.setProperty('width', `${pers}%`);
      recordRow.elementAppend(cover);
    });
    this.mainFild.elementAppend(recordRow);
    this.setVisibleCheckBtn(false);
    if (this.currentRound.word === 9) {
      this.resultBtn.setProperty('display', 'block');
      this.showFinalImage();
    }
    this.compliteBtn.setProperty('display', 'none');
    this.countinueBtn.setProperty('display', 'block');
  }

  public setVisibleCheckBtn(isVisible: boolean): void {
    if (isVisible) this.checkBtn.setProperty('display', 'block');
    else this.checkBtn.setProperty('display', 'none');
  }

  private compliteSentence = (): void => {
    const { level, round, word } = this.currentRound;
    setStorageIsKnown({ level, round, word, isKnown: 'unknown' });
    this.resetRow();
  };

  private clickResult = (): void => {
    this.checkRound(false);
    this.clearGame();
    this.app.startResult(isNull(this.data));
  };

  public clearGame(): void {
    PuzzleItem.removeAllItems();
    this.removeNode();
  }
}
