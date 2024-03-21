import CreateElement from '../create-element';
import { label, input, span } from '../../utils/tag-functions';
import { isNull } from '../../utils/functions';
import type Login from './login';

export default class LoginInput extends CreateElement {
  private labelName: CreateElement;

  private inputName: CreateElement = input({ type: 'text', className: 'login__input', required: 'required' });

  private spanName: CreateElement = span({ className: 'login__span' });

  private access: boolean = false;

  private regex: RegExp;

  private errorMsg: string;

  private value: string = '';

  private loginFrom: Login;

  constructor(login: Login, text: string, regex: RegExp, errorMsg: string) {
    super({ tag: 'div', className: 'login__field' });
    this.regex = regex;
    this.errorMsg = errorMsg;
    this.loginFrom = login;
    this.labelName = label({ className: 'login__label', textContent: `${text}` });
    this.appendChildren([this.labelName, this.inputName, this.spanName]);
    this.inputName.addEventListener('keyup', this.clickInput);
  }

  private clickInput = (e: Event): void => {
    e.preventDefault();
    const target = isNull(e.target as HTMLInputElement);
    this.value = target.value;
    this.loginFrom.checkInputs();
    const englishTextRegEx = /^[a-zA-Z\s-]*$/;
    const firstletterRegEx = /^[А-ЯA-Z][а-яА-Яa-zA-Z\s-]*$/;
    let message: string;
    if (!firstletterRegEx.test(this.value)) {
      message = 'First letter must be in uppercase';
      this.spanName.addClass('fail');
    } else if (!englishTextRegEx.test(this.value)) {
      this.spanName.addClass('fail');
      message = 'Text must be in English';
    } else if (!this.regex.test(this.value)) {
      this.spanName.removeClass('success').addClass('fail');
      this.access = false;
      message = `${this.errorMsg}`;
    } else {
      this.spanName.removeClass('fail').addClass('success');
      this.access = true;
      message = 'Everything all right';
    }
    this.spanName.textContent(message);
  };

  public getAccess(): boolean {
    return this.access;
  }

  public getValue(): string {
    return this.value;
  }
}
