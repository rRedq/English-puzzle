import type CreateElement from '../components/create-element';
import { LevelsData } from '../types/types';
import { getStorage, setStorage } from './functions';
import { div, option, p } from './tag-functions';

function createList(parentNode: CreateElement, values: number, title: 'Level' | 'Round', marked?: number[]): void {
  let index = 1;

  while (index < values + 1) {
    const value = option({ className: 'level__option', textContent: `${index}`, value: `${index}` });
    if (marked && marked.includes(index - 1) && title === 'Round') value.addClass('level__option-marked');
    else if (marked && marked.includes(index) && title === 'Level') value.addClass('level__option-marked');
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
  createList(selectList, length, title, level);
  const list = selectList;
  if (selected) (list.getNode() as HTMLSelectElement).value = selected;
  const text = p({ className: 'level__text', textContent: `${title}` });
  const cover = div({ className: 'level__select-cover' }, selectList);
  const container = div({ className: 'level__container' }, text, cover);
  parentNode.elementAppend(container);
}

function levelUp(maxCount: number, length: number, level: LevelsData) {
  if (maxCount === length) {
    const levels = getStorage<LevelsData[]>('progress');
    if (levels) {
      const newLevels = new Set([...levels, level]);
      setStorage<LevelsData[]>('progress', [...newLevels]);
    } else setStorage<LevelsData[]>('progress', [level]);
  }
}

export { createContainer, createList, levelUp };
