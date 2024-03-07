import CreateElement from '../components/create-element';
import type ElementOrNull from '../types/types';
import { type TagsProps, type InputProps } from '../types/interfaces';

// const input = new CreateElement<HTMLInputElement>('input');
const input = (props: InputProps) => new CreateElement<HTMLInputElement>({ ...props, tag: 'input' });

const label = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLLabelElement>({ ...props, tag: 'label' }, ...children);

const div = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLDivElement>({ ...props, tag: 'div' }, ...children);

const span = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLSpanElement>({ ...props, tag: 'span' }, ...children);

const form = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLFormElement>({ ...props, tag: 'form' }, ...children);

export { label, input, div, span, form };
