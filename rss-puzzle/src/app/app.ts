import CreateElement from './components/create-element';
import Login from './components/login/login';
import Header from './components/header/header';
import { getStorage } from './utils/functions';
import StartPage from './components/start-page/start-page';
import Game from './components/game/game';
import { type StorageAccess } from './types/interfaces';

export default class App extends CreateElement {
  private login = new Login(this);

  private header = new Header(this);

  private startSreen = new StartPage(this);

  private game = new Game(this);

  constructor() {
    super({ tag: 'div', className: 'app' });
    document.body.append(this.getNode());
  }

  public appStart(): void {
    this.removeChildren();
    if (getStorage<StorageAccess>('access')) {
      this.startPage();
    } else {
      this.elementAppend(this.login.createLogin());
    }
  }

  public startPage(): void {
    this.appendChildren([this.header.startHeader(), this.startSreen.createStartPage()]);
    // //
    // this.appendChildren([this.header.startHeader()]);
    // this.startGame();
    // //
  }

  public startGame(): void {
    this.game.clearGame();
    this.game = new Game(this);
    this.game.createGame();
  }
}
