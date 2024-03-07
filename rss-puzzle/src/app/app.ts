import CreateElement from './components/create-element';
import Login from './components/login/login';

// import { div, label, input } from './utils/tag-functions';
// import { isNull } from './utils/functions';

class App extends CreateElement {
  // private app: CreateElement | null = null;

  constructor() {
    super({ tag: 'div', className: 'app' });
  }

  append(): void {
    document.body.append(this.getNode());
  }

  // public getNode() {
  //   return isNull(this.app).getNode();
  // }
}
// const a = div({ className: 'first-name' }, label({ className: 'label' }, input({ className: 'first-name_input' })));
// const b = div({ className: 'sur-name' });
// const c = div({ className: 'app' }, a, b);
const app = new App();
app.append();
const item = new Login(app);
item.createLogin();
// export default app;
