import type CreateElement from '../components/create-element';
import { div, option, p } from './tag-functions';

function createList(parentNode: CreateElement, values: number, marked?: number[]): void {
  let index = 1;

  while (index < values + 1) {
    const value = option({ className: 'level__option', textContent: `${index}`, value: `${index}` });
    if (marked) {
      if (marked.includes(index - 1)) value.addClass('level__option-marked');
    }
    parentNode.elementAppend(value);
    index += 1;
  }
}

function createContainer(
  parentNode: CreateElement,
  selectList: CreateElement,
  length: number,
  title: 'Level' | 'Round',
  selected?: string,
  level?: number[]
): void {
  createList(selectList, length, level);
  const list = selectList;
  if (selected) (list.getNode() as HTMLSelectElement).value = selected;
  const text = p({ className: 'level__text', textContent: `${title}` });
  const cover = div({ className: 'level__select-cover' }, selectList);
  const container = div({ className: 'level__container' }, text, cover);
  parentNode.elementAppend(container);
}

export { createContainer, createList };
