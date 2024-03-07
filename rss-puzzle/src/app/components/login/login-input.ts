import CreateElement from '../create-element';
import { label, input, span } from '../../utils/tag-functions';
import { isNull } from '../../utils/functions';

export default class LoginInput extends CreateElement {
  private labelName: CreateElement;

  private inputName: CreateElement;

  private spanName: CreateElement;

  private access: boolean = false;

  private regex: RegExp;

  private errorMsg: string;

  private value: string = '';

  constructor(text: string, regex: RegExp, errorMsg: string) {
    super({ tag: 'div', className: 'login__field' });
    this.regex = regex;
    this.errorMsg = errorMsg;
    this.labelName = label({ className: 'login__label', textContent: `${text}` });
    this.inputName = input({ type: 'text', className: 'login__input', required: 'required' });
    this.spanName = span({ className: 'login__span' });
    this.elementAppend(this.labelName);
    this.createInput();
  }

  public createInput(): void {
    this.appendChildren([this.labelName, this.inputName, this.spanName]);
    this.inputName.addEventListener('keyup', this.handler.bind(this));
  }

  private handler(e: Event): void {
    const target = isNull(e.target as HTMLInputElement);
    this.value = target.value;
    const str = this.regex.test(target.value) ? 'Everything all right' : `${this.errorMsg}`;
    if (this.regex.test(target.value)) {
      this.spanName.removeClass('fail');
      this.spanName.addClass('success');
      this.access = true;
    } else {
      this.spanName.removeClass('success');
      this.spanName.addClass('fail');
      this.access = false;
    }
    this.spanName.textContent(str);
  }

  public getAccess(): boolean {
    return this.access;
  }

  public getValue(): string {
    return this.value;
  }
}
