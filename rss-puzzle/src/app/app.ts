import CreateElement from './components/create-element';
import Login from './components/login/login';
import Header from './components/header/header';
import { getStorage } from './utils/functions';
import StartPage from './components/start-page/start-page';
import Game from './components/game/game';
import { type StorageAccess, type CurrentWord } from './types/interfaces';

export default class App extends CreateElement {
  private login = new Login(this);

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
      this.elementAppend(this.login.createLogin());
    }
  }

  public startPage(): void {
    this.appendChildren([new Header(this), new StartPage(this)]);
    // //
    // this.elementAppend(new Header(this));
    // this.startGame();
    // //
  }

  public startGame(obj?: CurrentWord): void {
    if (this.game) this.game.clearGame();
    this.game = new Game(this, obj);
    this.elementAppend(this.game);
  }
}
