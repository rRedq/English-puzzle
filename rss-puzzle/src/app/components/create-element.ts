import { type ElementProps } from '../types/interfaces';
import type ElementOrNull from '../types/types';
import isNull from '../utils/functions';

export default class CreateElement<T extends HTMLElement = HTMLElement> {
  private node: T;

  private children: CreateElement[] = [];

  constructor(params: ElementProps, ...children: ElementOrNull[]) {
    const node = document.createElement(params.tag) as T;
    Object.assign(node, params);
    this.node = node;
    if (children) this.appendChildren(children);
  }

  public getNode() {
    return this.node;
  }

  public elementAppend(child: CreateElement): void {
    if (child instanceof CreateElement) {
      this.children.push(child);
      this.node.append(child.getNode());
    }
  }

  public appendChildren(children: ElementOrNull[]): void {
    children.forEach((child) => {
      this.elementAppend(isNull(child));
    });
  }
}
