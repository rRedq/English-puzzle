import CreateElement from './components/create-element';
import Login from './components/login/login';
import Header from './components/header/header';
import { getStorage } from './utils/functions';

export default class App extends CreateElement {
  private login = new Login(this);

  private header = new Header(this);

  constructor() {
    super({ tag: 'div', className: 'app' });
    document.body.append(this.getNode());
  }

  public appStart() {
    if (getStorage('access').length > 0) {
      this.startPage();
    } else {
      this.elementAppend(this.login.createLogin());
    }
  }

  public startPage(): void {
    this.elementAppend(this.header.startHeader());
  }
}
