import CreateElement from './components/create-element';
import Login from './components/login/login';

class App extends CreateElement {
  constructor() {
    super({ tag: 'div', className: 'app' });
  }

  append(): void {
    document.body.append(this.getNode());
  }
}

const app = new App();
app.append();
const item = new Login(app);
item.createLogin();
