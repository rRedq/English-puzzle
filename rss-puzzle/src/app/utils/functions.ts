import StorageStatus from '../types/enum';
import type { DataJson } from '../types/interfaces';
import type { LevelsData } from '../types/types';
import { gitRawUrl } from './constants';

function isNull<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw Error(`Expected 'value' to be defined, but received: ${value}`);
  }
  return value;
}
function checkId(id: string): void {
  if (!Object.values(StorageStatus)[Object.keys(StorageStatus).indexOf(id)]) {
    throw Error(`Unexpected id: ${id}`);
  }
}

function setStorage<T>(id: string, value: T): void {
  checkId(id);
  let obj: Map<string, T>;
  const prevObj = localStorage.getItem('rredq');
  if (prevObj) {
    obj = new Map<string, T>(JSON.parse(prevObj));
    obj.set(id, value);
  } else {
    obj = new Map<string, T>();
    obj.set(id, value);
  }

  localStorage.setItem('rredq', JSON.stringify([...obj]));
}

function getStorage<T>(id: string): T | undefined {
  checkId(id);
  const storage = localStorage.getItem('rredq');
  if (!storage) return undefined;
  const result = new Map<string, T>(JSON.parse(storage)).get(id);
  if (!result) return undefined;

  return result;
}

function deleteStorage() {
  localStorage.clear();
}

function getProgressStorage(level: LevelsData): number[] {
  const prevObj = localStorage.getItem('rredq-progress');
  if (!prevObj) {
    return [];
  }

  const obj = new Map<string, Map<LevelsData, number[]>>(JSON.parse(prevObj));
  const newObj = new Map<LevelsData, number[]>(obj.get('progress'));

  let result: number[] = [];
  const value = newObj.get(level);
  if (value) {
    result = value;
  }

  return result;
}

function setProgressStorage(level: LevelsData, round: number[]): void {
  const prevObj = localStorage.getItem('rredq-progress');
  let obj: Map<string, Map<LevelsData, number[]>>;

  if (prevObj) {
    obj = new Map<string, Map<LevelsData, number[]>>(JSON.parse(prevObj));
    const newObj = new Map<LevelsData, number[]>(obj.get('progress'));

    if (newObj.has(level)) {
      const set = new Set(newObj.get(level));
      round.forEach((item: number) => {
        set.add(item);
      });
      newObj.set(level, [...set]);
      obj.set('progress', newObj);
    } else {
      newObj.set(level, round);
      obj.set('progress', newObj);
    }
  } else {
    const baseMap = new Map<LevelsData, number[]>();
    baseMap.set(level, round);
    obj = new Map<string, Map<LevelsData, number[]>>();
    obj.set('progress', baseMap);
  }

  const serialized = Array.from(obj, ([key, value]) => [key, Array.from(value)]);
  localStorage.setItem('rredq-progress', JSON.stringify(serialized));
}

function getNewPosition(column: HTMLElement, posX: number) {
  const puzzles: NodeListOf<Element> = column.querySelectorAll('.game__item:not(.dragging)');
  let result: Element | undefined;

  for (let i = 0; i < puzzles.length; i += 1) {
    const box: DOMRect = puzzles[i].getBoundingClientRect();
    const boxCenterX = box.x + box.width / 2;
    if (posX >= boxCenterX) result = puzzles[i];
  }

  return result;
}

async function getData(level: LevelsData): Promise<DataJson> {
  const link = `${gitRawUrl}/data/wordCollectionLevel${level}.json`;
  const result = await fetch(link)
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => new Error(err));
  return result;
}

export {
  isNull,
  setStorage,
  getStorage,
  deleteStorage,
  getNewPosition,
  getData,
  setProgressStorage,
  getProgressStorage,
};
