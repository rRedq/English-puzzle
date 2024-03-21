import CreateElement from './components/create-element';
import Login from './components/login/login';
import Header from './components/header/header';
import { getStorage } from './utils/functions';
import StartPage from './components/start-page/start-page';
import Game from './components/game/game';
import { type StorageAccess, type CurrentWord, DataJson } from './types/interfaces';
import Modal from './components/modal/modal';
import Result from './components/result/result';

export default class App extends CreateElement {
  private game: Game | undefined;

  constructor() {
    super({ tag: 'div', className: 'app' });
    document.body.append(this.getNode());
  }

  public appStart(): void {
    this.removeChildren();
    if (getStorage<StorageAccess>('access')) {
      this.startPage();
    } else {
      this.elementAppend(new Login(this));
    }
  }

  public startPage(): void {
    this.appendChildren([new Header(this), new StartPage(this)]);
    //
    // this.elementAppend(new Header(this));
    // this.startGame();
  }

  public startGame(obj?: CurrentWord, isModal?: boolean): void {
    if (this.game) this.game.clearGame();
    this.game = new Game(this, obj);
    if (isModal && obj) this.appendChildren([this.game, new Modal(obj)]);
    else this.elementAppend(this.game);
  }

  public startResult(data: DataJson) {
    this.elementAppend(new Result(this, data));
  }
}
