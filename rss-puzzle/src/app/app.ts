import CreateElement from './components/create-element';
import Login from './components/login/login';
import Header from './components/header/header';
import { getStorage } from './utils/functions';
import StartPage from './components/start-page/start-page';

export default class App extends CreateElement {
  private login = new Login(this);

  private header = new Header(this);

  private startSreen = new StartPage(this);

  constructor() {
    super({ tag: 'div', className: 'app' });
    document.body.append(this.getNode());
  }

  public appStart() {
    this.removeChildren();
    if (getStorage('access').length > 0) {
      this.startPage();
    } else {
      this.elementAppend(this.login.createLogin());
    }
  }

  public startPage(): void {
    this.elementAppend(this.header.startHeader());
    this.elementAppend(this.startSreen.createStartPage());
  }
}
