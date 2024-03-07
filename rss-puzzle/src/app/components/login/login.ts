import CreateElement from '../create-element';
import { input } from '../../utils/tag-functions';
import LoginInput from './login-input';
import './login.scss';

export default class Login extends CreateElement {
  private firstField: LoginInput;

  private secondField: LoginInput;

  private button: CreateElement;

  constructor(elem: CreateElement) {
    super({ tag: 'form', className: 'login' });
    elem.elementAppend(this);
    this.firstField = new LoginInput('First name');
    this.secondField = new LoginInput('Surname');
    this.button = input({
      className: 'login__btn',
      value: 'Login',
      type: 'submit',
    });
  }

  public createLogin() {
    this.appendChildren([this.firstField, this.secondField, this.button]);
    console.log(this.firstField.getNode());
  }
}

// const LoginPage = new Login();
// export default LoginPage;
